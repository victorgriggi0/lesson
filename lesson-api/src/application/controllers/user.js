const { request, response } = require("express");
const { userRepository } = require("../../domain/repositories/user");
const { HttpResponse } = require("../helpers/http");

const userController = {
  /**
   * @param  {request} req
   * @param  {response} res
   */
  async findAll(req, res) {
    const { page, pageSize } = req.query;

    const httpResponse = HttpResponse(res);

    const users = await userRepository.findAll(page, pageSize);

    return httpResponse.ok({
      results: users,
      pagination: {
        page,
        pageSize,
      },
    });
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

    const httpResponse = HttpResponse(res);

    const result = await userRepository.create({ ...payload });

    if (!result.created)
      return httpResponse.badRequest("Cannot create a new user");

    return httpResponse.ok({ ...result });
  },

  /**
   * @param  {request} req
   * @param  {response} res
   */
  async update(req, res) {
    const payload = req.body;
    const { id } = req.params;

    const httpResponse = HttpResponse(res);

    const result = await userRepository.update(id, payload);

    return httpResponse.ok({ ...result });
  },

  /**
   * @param  {request} req
   * @param  {response} res
   */
  async destroy(req, res) {
    const { id } = req.params;

    const httpResponse = HttpResponse(res);

    const result = await userRepository.update(id, payload);

    return httpResponse.ok({ ...result });
  },
};

module.exports = { userController };
