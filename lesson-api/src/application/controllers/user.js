const { request, response } = require("express");
const { userRepository } = require("../../domain/repositories/user");

const UserController = {
  /**
   * @param  {request} req
   * @param  {response} res
   */
  async findAll(req, res) {
    res.status(200).json({ message: "ok" }).send();
  },

  /**
   * @param  {request} req
   * @param  {response} res
   */
  async findOne(req, res) {},

  /**
   * @param  {request} req
   * @param  {response} res
   */
  async create(req, res) {
    const payload = req.body;

    const result = await userRepository.create({ ...payload });

    console.log(result);

    if (!result.created)
      return res
        .status(400)
        .json({ error: "ok", message: "cannot create a new user" })
        .send();

    res
      .status(200)
      .json({ ...result })
      .send();
  },

  /**
   * @param  {request} req
   * @param  {response} res
   */
  async update(req, res) {},

  /**
   * @param  {request} req
   * @param  {response} res
   */
  async destroy(req, res) {},
};

module.exports = { UserController };
