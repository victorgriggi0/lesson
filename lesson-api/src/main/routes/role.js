const { roleController } = require("../../application/controllers/role");

/**
 * @param  {Router} router
 */
const setupRoute = (router) => {
  router.get("/roles", roleController.findAll);
  router.get("/roles/:id", roleController.findOne);
  router.post("/roles", roleController.create);
  router.put("/roles/:id", roleController.update);
  router.delete("/roles/:id", roleController.destroy);
};

module.exports = setupRoute;
