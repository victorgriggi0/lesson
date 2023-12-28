require("dotenv").config({
  path: ".env.local",
});

const { env } = require("../../main/config/env");

module.exports = {
  host: env.database.host,
  username: env.database.userName,
  password: env.database.password,
  port: Number(env.database.port),
  database: env.database.name,
  dialect: env.database.dialect ?? "postgres",
  operatorsAliases: false,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
