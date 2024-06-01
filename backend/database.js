const Sequelize = require("sequelize");
require('dotenv').config(); 
// const mysql = require("mysql2");

const pg = require('pg');
// Connecting to the database using the Sequelize ORM (Object Relational Mapping)
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//     logging: false,
//   }
// );

module.exports = sequelize;
