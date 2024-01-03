const { userController } = require("../../application/controllers/user");

/**
 * @param  {Router} router
 */
const setupRoute = (router) => {
  router.get("/users", userController.findAll);
  router.get("/users/:id", userController.findOne);
  router.post("/users", userController.create);
  router.put("/users/:id", userController.update);
  router.delete("/users/:id", userController.destroy);
};

module.exports = setupRoute;
