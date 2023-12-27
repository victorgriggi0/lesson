const bodyParser = require("body-parser");
const cors = require("cors");

//
const roles = require("./rolesRoutes");
const users = require("./usersRoutes");
const conditions = require("./conditionsRoutes");
const companies = require("./companiesRoutes");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(cors({ origin: "*" }));
  app.use(roles);
  app.use(users);
  app.use(conditions);
  app.use(companies);
};
