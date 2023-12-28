const express = require("express");
const { setupMiddlewares } = require("./middlewares");
const { setupRoutes } = require("./routes");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
setupMiddlewares(app);
setupRoutes(app);

module.exports = { app };
