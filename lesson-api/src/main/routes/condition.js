const {
  ConditionController,
} = require("../../application/controllers/condition");

/**
 * @param  {Router} router
 */
const setupRoute = (router) => {
  router.get("/conditions", ConditionController.findAll);
  router.get("/conditions/:id", ConditionController.findOne);
  router.post("/conditions", ConditionController.create);
  router.put("/conditions/:id", ConditionController.update);
  router.delete("/conditions/:id", ConditionController.destroy);
};

module.exports = setupRoute;
