require("dotenv").config()
const { options, database } = require("../config/config.json");
const Sequelize = require("sequelize");
const { DATABASE_URL } = process.env

let db;

if (DATABASE_URL){
    db = new Sequelize(`${DATABASE_URL}`, {
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
      });
} else {
    db = new Sequelize(database, null, null, options);

}


module.exports = db