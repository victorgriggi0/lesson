const { Router } = require("express");
const { readdirSync } = require("fs");
const { join } = require("path");

const setupRoutes = (app) => {
  const router = Router();

  readdirSync(join(__dirname, "../routes"))
    .filter((file) => !file.endsWith(".map"))
    .map(async (file) => {
      (await import(`../routes/${file}`)).default(router);
    });

  app.use("/v1", router);
};

module.exports = { setupRoutes };
