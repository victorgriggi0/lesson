const { Sequelize, DataTypes } = require("sequelize");
import { User } from "./user";

const sequelize = new Sequelize(
  "postgres://guest:guest@localhost:5432/dev_db@valedopacu"
);

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
  },
  { timestamps: true }
);

Role.hasMany(User, {
  foreignKey: {
    name: "roleId",
  },
});

module.exports = { Role };
