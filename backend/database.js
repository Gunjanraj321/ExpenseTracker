const Sequelize = require("sequelize");
require('dotenv').config(); 
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

module.exports = sequelize;
