const { request, response } = require("express");

const AuthController = {
  /**
   * @param  {request} req
   * @param  {response} res
   */
  async signIn(req, res) {
    res.send("Signed");
  },

  /**
   * @param  {request} req
   * @param  {response} res
   */
  async signUp(req, res) {
    res.send("Registered");
  },
};

module.exports = { AuthController };
