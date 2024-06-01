import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ExpenseItem from "./ExpenseItem";
import UpdateExpenseModal from "./UpdateExpenseModal";

const PaginatedExpenseList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const token = useSelector((state) => state.auth.isToken);

  useEffect(() => {
    fetchExpenseList(currentPage);
  }, [currentPage]);

  const fetchExpenseList = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/expenses/paginated?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = response.data;
      setExpenses(data.expenses);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log("Error occurred while fetching data:", err);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const openUpdateModal = (expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsModalOpen(false);
    setSelectedExpense(null);
  };

  const handleUpdateExpense = async (expenseId, updatedExpense) => {
    try {
      console.log(updatedExpense.id);
      const response = await axios.put(
        `http://localhost:3000/api/expenses/${expenseId}`,
        updatedExpense,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        fetchExpenseList(currentPage);
      }
    } catch (err) {
      console.log("Error occurred while updating expense:", err);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/expenses/${expenseId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        fetchExpenseList(currentPage);
      }
    } catch (err) {
      console.log("Error occurred while deleting expense:", err);
    }
  };

  return (
    <div className="container align-middle mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-700">Expense List</h2>
      <div className="flex justify-center">
    <ul id="expenseList" className="w-5/12 divide-y divide-gray-200">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onUpdate={openUpdateModal}
          onDelete={handleDeleteExpense}
          className="py-4"
        />
      ))}
    </ul>
  </div>
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 mr-4"
        >
          Previous
        </button>
        <span className="text-lg text-gray-600">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 ml-4"
        >
          Next
        </button>
      </div>
      <UpdateExpenseModal
        isOpen={isModalOpen}
        onClose={closeUpdateModal}
        onUpdateExpense={handleUpdateExpense}
        expense={selectedExpense}
      />
    </div>
  );
};

export default PaginatedExpenseList;
