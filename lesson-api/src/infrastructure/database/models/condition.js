const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname");

export const Condition = sequelize.define(
  "Condition",
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
  },
  { timestamps: true }
);
