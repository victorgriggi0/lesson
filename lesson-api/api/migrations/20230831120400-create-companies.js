"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("companies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      phone: {
        type: Sequelize.TEXT,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.TEXT,
      },
      website: {
        type: Sequelize.TEXT,
      },
      cep: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      state: {
        type: Sequelize.TEXT,
      },
      city: {
        type: Sequelize.TEXT,
      },
      neighborhood: {
        type: Sequelize.TEXT,
      },
      avenue: {
        type: Sequelize.TEXT,
      },
      conditionId: {
        references: {
          model: "conditions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("companies");
  },
};
