const { UserController } = require("../../application/controllers/user");

/**
 * @param  {Router} router
 */
const setupRoute = (router) => {
  router.get("/users", UserController.findAll);
  router.get("/users/:id", UserController.findOne);
  router.post("/users", UserController.create);
  router.put("/users/:id", UserController.update);
  router.delete("/users/:id", UserController.destroy);
};

module.exports = setupRoute;
