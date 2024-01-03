const { request, response } = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../../infrastructure/database/models/user");
const {
  checkIfUserAlreadyExists,
} = require("../../domain/use-cases/user-exists");
const {
  authenticateUser,
} = require("../../domain/use-cases/authenticate-user");
const { HttpResponse } = require("../helpers/http");

const AuthController = {
  /**
   * @param  {request} req
   * @param  {response} res
   */
  async signIn(req, res) {
    const payload = req.body;

    const httpResponse = HttpResponse(res);

    const { exists, user } = await checkIfUserAlreadyExists({
      email: payload.email,
    });

    if (!exists) return httpResponse.notFound("User does not exist");

    const { accessToken } = await authenticateUser(user.id);

    return httpResponse.ok({ accessToken });
  },

  /**
   * @param  {request} req
   * @param  {response} res
   */
  async signUp(req, res) {
    const payload = req.body;

    const httpResponse = HttpResponse(res);

    const alreadyExists = await checkIfUserAlreadyExists({
      email: payload.email,
    });

    if (alreadyExists) return httpResponse.badRequest("user already exists");

    const passwordHashed = await bcrypt.hash(payload.password, 16);

    const createdUser = User.create({
      ...payload,
      password: passwordHashed,
    });

    const { accessToken } = await authenticateUser(createdUser.id);

    return httpResponse.ok({ accessToken });
  },
};

module.exports = { AuthController };
