const dbEngine = process.env.DB_ENVIRONMENT || "development";
const config = require("../config/config.json")[dbEngine];
const Sequelize = require("sequelize");


const db = new Sequelize(config);


module.exports = db