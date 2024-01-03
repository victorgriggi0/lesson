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
      phone_number: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
      },
      web_site: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      cep: {
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
      condition_id: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("companies");
  },
};
