const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});
;(async function() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
      } catch (error) {
        console.error("Unable to connect to the database:", error);
      }
})();