require("dotenv").config();

//importing the modules here in server.js
const express = require("express");
const cors = require("cors");
const sequelize = require("./database");


//importing middleware
const verify = require("./middleware/verifyToken");

//importing routes
const expenseRoute = require("./routes/expenseRoute");
const signup_loginRoute = require("./routes/signup&loginRoute");
const forgotPassRoute = require("./routes/forgotPassRoute");
const premiumRoute = require("./routes/premiumRoute");

//importing models
const user = require("./models/userModel");
const List = require("./models/expenseModel");
const Order = require("./models/orderModel");
const forgotPasswordRequest = require("./models/forgotpassModel");


//instantiating the application
const app = express();

app.use(cors());

app.use(express.json());

//making the relation between the user and the expenses abd the orders
List.belongsTo(user, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
user.hasMany(List, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Order.belongsTo(user,{
  foreignKey: "userId",
  onDelete: "CASCADE",
});
user.hasMany(Order,{
  foreignKey: "userId",
  onDelete: "CASCADE",
});
forgotPasswordRequest.belongsTo(user, {
  foreignKey: "userId",
});
user.hasMany(forgotPasswordRequest, {
  foreignKey: "userId",
});

//making the route endpoint, server can handle the route request and sending the response
app.use("/api/sign", signup_loginRoute);
app.use("/api/pass", forgotPassRoute);

app.use("/api/expenses", verify.verify, expenseRoute);
app.use("/api/premium",verify.verify, premiumRoute);


// making the port for server to listen
const port = process.env.PORT || 3000;

// listening on port
async function initiate() {
  try {
    await sequelize.sync()
    console.log("db connected")
    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
initiate();

module.exports = app;
