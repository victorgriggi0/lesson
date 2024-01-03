const { sequelize } = require("../../infrastructure/database/sequelize");

const setupSequelize = async () => {
  await sequelize.sync({ force: true });
};

module.exports = { setupSequelize };
