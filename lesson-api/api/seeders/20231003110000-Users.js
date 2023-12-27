"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        name: "postgres",
        email: "postgres@lesson.com",
        password: await bcrypt.hash("outerwilds", Number(process.env.SALT)),
        roleId: 1,
      },
    ];

    return queryInterface.bulkInsert("users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
