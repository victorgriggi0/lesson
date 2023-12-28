const { request, response } = require("express");

const FileController = {
  /**
   * @param  {request} req
   * @param  {response} res
   */
  async findAll(req, res) {},

  /**
   * @param  {request} req
   * @param  {response} res
   */
  async findOne(req, res) {},

  /**
   * @param  {request} req
   * @param  {response} res
   */
  async create(req, res) {},

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

module.exports = { FileController };
