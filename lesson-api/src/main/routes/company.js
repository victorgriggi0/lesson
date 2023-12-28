const { CompanyController } = require("../../application/controllers/company");

/**
 * @param  {Router} router
 */
const setupRoute = (router) => {
  router.get("/companies", CompanyController.findAll);
  router.get("/companies/:id", CompanyController.findOne);
  router.post("/companies", CompanyController.create);
  router.put("/companies/:id", CompanyController.update);
  router.delete("/companies/:id", CompanyController.destroy);
};

module.exports = setupRoute;
