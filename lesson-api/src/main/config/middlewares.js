const cors = require("cors");
const { json } = require("express");

const setupMiddlewares = (app) => {
  app.use(cors({ origin: "*" }));
  app.use(json());
  app.use((req, res, next) => {
    res.type("json");

    next();
  });
};

module.exports = { setupMiddlewares };
