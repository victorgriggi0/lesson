const { FileController } = require("../../application/controllers/file");
const multer = require("multer");
const multerConfig = require("../config/multer");

/**
 * @param  {Router} router
 */
const setupRoute = (router) => {
  router.get("/files", FileController.findAll);
  router.get("/files/:id", FileController.findOne);
  router.post("/files", FileController.create);
  router.put("/files/:id", FileController.update);
  router.delete("/files/:id", FileController.destroy);
  router.post(
    "/files/upload",
    multer(multerConfig).single("file"),
    FileController.upload
  );
};

module.exports = setupRoute;
