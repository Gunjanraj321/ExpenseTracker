const Sequelize = require("sequelize");
require('dotenv').config(); // Ensure environment variables are loaded

// Connecting to the database using the Sequelize ORM (Object Relational Mapping)
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

module.exports = sequelize;
