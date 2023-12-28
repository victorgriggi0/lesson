"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("companies", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
      },
      phoneNumber: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
      },
      webSite: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      CEP: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      neighborhood: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      avenue: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      conditionId: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("companies");
  },
};
