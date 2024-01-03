const { request, response } = require("express");
const { HttpResponse } = require("../helpers/http");
const { File } = require("../../infrastructure/database/models/file");
const { fileRepository } = require("../../domain/repositories/file");

const FileController = {
  /**
   * @param  {request} req
   * @param  {response} res
   */
  async findAll(req, res) {
    const { page, pageSize } = req.query;

    const httpResponse = HttpResponse(res);

    const files = await fileRepository.findAll(page, pageSize);

    return httpResponse.ok({
      results: files,
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

    const result = await fileRepository.create({ ...payload });

    if (!result.created)
      return httpResponse.badRequest("Cannot create a new file");

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

    const result = await fileRepository.update(id, payload);

    return httpResponse.ok({ ...result });
  },

  /**
   * @param  {request} req
   * @param  {response} res
   */
  async destroy(req, res) {
    const { id } = req.params;

    const httpResponse = HttpResponse(res);

    const result = await fileRepository.update(id, payload);

    return httpResponse.ok({ ...result });
  },

  /**
   * @param  {request} req
   * @param  {response} res
   */
  async upload(req, res) {
    const { originalname: name, size, key, location: url = "" } = req.file;

    const httpResponse = HttpResponse(res);

    console.log(name, size, key, url);

    try {
      const createdFile = await File.create({
        name,
        size,
        key,
        url,
      });

      httpResponse.ok({ ...createdFile });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error uploading file to S3");
    }
  },
};

module.exports = { FileController };
