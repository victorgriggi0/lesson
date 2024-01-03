const { request, response } = require("express");
const { roleRepository } = require("../../domain/repositories/role");

const roleController = {
  /**
   * @param  {request} req
   * @param  {response} res
   */
  async findAll(_, res) {
    const roles = await roleRepository.findAll();
    res.status(200).json({ results: roles }).send();
  },

  /**
   * @param  {request} req
   * @param  {response} res
   */
  async findOne(req, res) {
    const { id } = req.params;

    const role = await roleRepository.findOne(id);

    if (!role)
      return res
        .status(404)
        .json({ error: "not-found", message: "role not found" })
        .send();

    res.status(200).json({ role }).send();
  },

  /**
   * @param  {request} req
   * @param  {response} res
   */
  async create(req, res) {
    const { permissions, ...rest } = req.body;

    const result = await roleRepository.create({
      permissions: JSON.stringify(permissions),
      ...rest,
    });

    if (!result.created)
      return res
        .status(400)
        .json({ error: "ok", message: "cannot create a new role" })
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

module.exports = { roleController };
