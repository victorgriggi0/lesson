const { FileController } = require("../../application/controllers/file");

/**
 * @param  {Router} router
 */
const setupRoute = (router) => {
  router.get("/files", FileController.findAll);
  router.get("/files/:id", FileController.findOne);
  router.post("/files", FileController.create);
  router.put("/files/:id", FileController.update);
  router.delete("/files/:id", FileController.destroy);
};

module.exports = setupRoute;
