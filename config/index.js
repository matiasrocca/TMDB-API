
const { options, database } = require("../config/config.json");
const Sequelize = require("sequelize");


const db = new Sequelize(database, null, null, options);


module.exports = db