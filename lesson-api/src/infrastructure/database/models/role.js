const { Sequelize, DataTypes } = require("sequelize");
const { User } = require("./user");
const { sequelize } = require("../sequelize");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
  },
  {
    tableName: "roles",
    underscored: true,
  }
);

Role.hasMany(User, {
  foreignKey: {
    name: "role_id",
  },
});

module.exports = { Role };
