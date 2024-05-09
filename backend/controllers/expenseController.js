// Importing necessary modules and models
const List = require("../models/expenseModel");
const User = require("../models/userModel");
const sequelize = require("../database");
const DownloadedFiles = require("../models/downloadfileModel");
const S3Services = require("../service/S3services");

// Controller function to get paginated list of expenses for a user
const getAllPaginatedExpenses = async (req, res) => {
  try {
    // Extracting user ID from the request
    const userId = req.user.userId;
    // Getting requested page and setting page size
    const page = req.query.page || 1;
    const pageSize = 5;

    // Fetching expenses using Sequelize findAndCountAll
    const { count, rows } = await List.findAndCountAll({
      where: { userId: userId },
      attributes: ["id", "name", "quantity", "amount"],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    // Calculating total pages and sending the response
    const totalPages = Math.ceil(count / pageSize);
    res.json({
      totalItems: count,
      totalPages: totalPages,
      currentPage: page,
      expenses: rows,
    });
  } catch (error) {
    console.error("Error fetching paginated expenses:", error);
    res.status(500).json({
      error: "An error occurred while fetching paginated expenses.",
    });
  }
};

// Controller function to get a single expense by ID
const getExpenseById =  async (req, res) => {
  const expenseId = req.params.id;
  try {
    // Finding an expense by ID
    const row = await List.findOne({ where: {id: expenseId}});
    if (!row) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(row);
  } catch (error) {
    console.error("error fetching expense", error);
    res.status(500).json({
      error: "An error occurred while fetching a user.",
    });
  }
};

// Controller function to create a new expense
const createExpense = async (req, res) => {
  let t;
  try {
    // Extracting data from the request
    const { name, quantity, amount } = req.body;
    const user = req.user;

    // Initiating a Sequelize transaction
    t = await sequelize.transaction();

    // Creating a new expense and updating user's total cost
    const newExpense = await List.create({
      name,
      quantity,
      amount,
      userId: req.user.userId,
    },
    { transaction: t }
    );

    await User.update(
      {total_cost: sequelize.literal(`total_cost + ${amount}`)},
      {
        where: {id: user.userId},
        transaction: t,
      }
    );

    // Committing the transaction and sending the response
    await t.commit();
    res.status(201).json(newExpense);
  } catch (error) {
    // Rolling back the transaction in case of an error
    if(t){
      await t.rollback();
    }
    console.error("Error creating expense:", error);
    res.status(500).json({
      error: "An error occurred while inserting the user.",
    });
  }
};

// Controller function to delete an expense by ID
const deleteExpense = async (req, res) => {
  let t;
  const expenseId = req.params.id;
  try {
    // Initiating a Sequelize transaction
    t = await sequelize.transaction();

    // Finding the expense to be deleted and its amount
    const rowsAffected = await List.findOne({
      where: { id: expenseId},
      attribute: ["id", "amount"],
      transaction: t,
    });
    if(!rowsAffected){
      await t.rollback();
      return res.status(404).json({
        error: "Expense not found",
      });
    }

    const amountToDelete = rowsAffected.amount;

    // Updating user's total cost and deleting the expense
    await User.update(
      {
        total_cost: sequelize.literal(`total_cost - ${amountToDelete}`),
      },{
        where: {id: req.user.userId},
        transaction: t,
      }
    );

    await List.destroy(
      {
        where: {id: expenseId},
        transaction: t,
      }
    );

    // Committing the transaction and sending the response
    await t.commit();
    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    // Rolling back the transaction in case of an error
    if(t){
      await t.rollback();
    }
    console.error("error deleting expense:",error);
    res.status(500).json({
      error: "An error occurred while deleting the user.",
    });
  }
};

// Controller function to update an expense by ID
const updateExpense = async (req, res) => {
  let t;
  const expenseId = req.params.id;
  const { name, quantity, amount } = req.body;
  const user = req.user;

  try {
    const userId = req.user.userId;
    // Initiating a Sequelize transaction
    t = await sequelize.transaction();

    // Updating the expense and retrieving the updated expense
    const row = await List.update(
      {
        name,
        quantity,
        amount,
      },
      {
        where: { id: expenseId, userId: userId},
        returning: true,
        transaction: t,
      }
    );

    const updatedExpense = await List.findByPk(expenseId);

    // Handling the case where no rows are updated
    if(row === 0){
      await t.rollback();
      return res.status(404).json({
        error: "Expense not found",
      });
    }

    // Calculating the difference in amount and updating user's total cost
    const diffAmount = amount - updatedExpense.amount;

    await User.update(
      {
        total_cost: sequelize.literal(`total_cost + ${diffAmount}`),
      },
      {
        where: { id: userId},
        transaction: t,
      }
    );

    // Committing the transaction and sending the response
    await t.commit();
    res.status(200).json(updatedExpense);
  } catch (error) {
    // Rolling back the transaction in case of an error
    if(t){
      await t.rollback();
    }
    console.error("error updating expense:",error);
    res.status(500).json({
      error: "An error occurred while updating the user.",
    });
  }
};

// Controller function to download expenses and store the file URL
const downloadExpense = async (req, res) => {
  try {
    const userId = req.user.userId;
    let Expense = await List.findAll({where: { userId: userId }, });
    // Converting expenses to JSON string
    const stringifiedExpenses = JSON.stringify(Expense);
    const filename = `Expenses${userId}/${new Date()}.txt`;
    // Uploading the JSON string to S3 and getting the file URL
    const fileURL = await S3Services.uploadToS3(stringifiedExpenses, filename);
    console.log("this is the fileUrl",fileURL);
    // Creating a record of the downloaded file
    const downloadfiles = await DownloadedFiles.create({
      link: fileURL,
      userId: userId,
    });
    // Sending the response with file URL
    res.status(200).json({ fileURL, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong", err: err });
  }
};

// Controller function to get the file download history for a user
const getfilehistory = async (req, res) => {
  try {
    // Extracting user ID from the request
    let userId = req.user.userId;
    // Fetching downloaded files for the user
    let files = await DownloadedFiles.findAll({ where: { userId: userId } });
    console.log(files);
    // Sending the downloaded files as the response
    res.json(files);
  } catch (err) {
    res
      .status(500)
      .json({ message: "can't find the required files", err: err });
  }
};

// Exporting all the controller functions
module.exports = {
  createExpense,
  getAllPaginatedExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getfilehistory,
  downloadExpense
};
