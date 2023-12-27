"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Companies.belongsTo(models.conditions, {
        foreignKey: {
          name: "conditionId",
        },
      });
    }
  }
  Companies.init(
    {
      name: DataTypes.TEXT,
      description: DataTypes.TEXT,
      phone: DataTypes.TEXT,
      email: DataTypes.TEXT,
      website: DataTypes.TEXT,
      cep: DataTypes.TEXT,
      state: DataTypes.TEXT,
      city: DataTypes.TEXT,
      neighborhood: DataTypes.TEXT,
      avenue: DataTypes.TEXT,
      conditionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "companies",
    }
  );
  return Companies;
};
