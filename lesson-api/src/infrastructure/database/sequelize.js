const { Sequelize } = require("sequelize");
const rootConfig = require("./config");

const sequelize = new Sequelize(rootConfig);

module.exports = { sequelize };
