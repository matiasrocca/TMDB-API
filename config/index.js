
const config = require("../config/config.json");
const Sequelize = require("sequelize");


const db = new Sequelize(config);


module.exports = db