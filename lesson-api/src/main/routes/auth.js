const { Router } = require("express");
const { AuthController } = require("../../application/controllers/auth");

/**
 * @param  {Router} router
 */
const setupRoute = (router) => {
  router.post("/auth/sign-in", AuthController.signIn);
  router.post("/auth/sign-up", AuthController.signUp);
};

module.exports = setupRoute;
