const { RoleController } = require("../../application/controllers/role");

/**
 * @param  {Router} router
 */
const setupRoute = (router) => {
  router.get("/roles", RoleController.findAll);
  router.get("/roles/:id", RoleController.findOne);
  router.post("/roles", RoleController.create);
  router.put("/roles/:id", RoleController.update);
  router.delete("/roles/:id", RoleController.destroy);
};

module.exports = setupRoute;
