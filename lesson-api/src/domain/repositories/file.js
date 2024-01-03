const { File } = require("../../infrastructure/database/models/file");
const { paginate } = require("../../application/helpers/paginate");
const aws = require("aws-sdk");

const fileRepository = {
  /**
   * @param  {Number} page current page
   * @param  {Number} pageSize limit of the register per page
   * @param  {Object} query query search parameters
   */
  async findAll(page = 1, pageSize = 5, query) {
    try {
      const SIGNED_URL_EXPIRES = 60 * 5;

      const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });

      const files = await File.findAll(
        paginate({ where: { ...query } }, { page, pageSize })
      );

      if (!files || !files.length) return [];

      return files.map(({ id, name, size, key, createdAt, updatedAt }) => {
        const url = s3.getSignedUrl("getObject", {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: key,
          Expires: SIGNED_URL_EXPIRES,
        });

        return {
          id,
          name,
          key,
          url,
          createdAt,
          updatedAt,
        };
      });
    } catch (error) {
      console.log(`unable to find all files because error: ${error}`);
    }
  },

  /**
   *
   * @param {Number} id
   */
  async findOne(id) {
    try {
      const file = File.findOne({ where: { id } });
      return file;
    } catch (error) {
      console.log(`unable to find a specific file because error: ${error}`);
      return null;
    }
  },

  /**
   * @param {Object} payload file payload.
   * @param {String} payload.firstName file first name.
   * @param {String} payload.lastName file last name.
   * @param {String} payload.email file email address.
   * @param {String} payload.phoneNumber file phone number.
   * @param {String} payload.password file password.
   */
  async create(payload) {
    try {
      const created = await File.create({ ...payload });

      return {
        created: true,
        id: created.id,
      };
    } catch (error) {
      console.log(`unable to create a new file because error: ${error}`);
      return {
        created: false,
        id: null,
      };
    }
  },

  /**
   * @param {Number} id file id.
   * @param {Object} payload file payload.
   * @param {String} payload.firstName file first name.
   * @param {String} payload.lastName file last name.
   * @param {String} payload.email file email address.
   * @param {String} payload.phoneNumber file phone number.
   * @param {String} payload.password file password.
   */
  async update(id, payload) {
    try {
      await File.update({ ...payload }, { where: { id } });
      return { updated: true, id };
    } catch (error) {
      console.log(`unable to update file because error: ${error}`);
      return { updated: false, id: null };
    }
  },

  /**
   *
   * @param {Number} id
   */
  async destroy(id) {
    try {
      await File.destroy({ where: { id } });
      return { destroyed: true, id };
    } catch (error) {
      console.log(`unable to destroy file because error: ${error}`);
      return { destroyed: false, id: null };
    }
  },
};

module.exports = { fileRepository };
