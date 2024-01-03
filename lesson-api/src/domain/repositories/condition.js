const { User } = require("../../infrastructure/database/models/condition");

const userRepository = {
  /**
   * @param  {number} page current page
   * @param  {number} limit limit of the register per page
   */
  async findAll(page, limit) {
    try {
      const users = await User.findAll();

      if (!users || !users.length) return [];

      return users;
    } catch (error) {
      console.log(`unable to find all users because error: ${error}`);
    }
  },

  /**
   * @param  {number} id user id
   */
  async findOne(id) {
    try {
      const condition = await this.findOne({ where: { id } });

      if (!condition) return null;

      return condition;
    } catch (error) {
      console.log(`unable to find a specific company condition`);
    }
  },

  /**
   * @param {Object} payload user payload.
   * @param {string} payload.firstName user first name.
   * @param {string} payload.lastName user last name.
   * @param {string} payload.email user email address.
   * @param {string} payload.phoneNumber user phone number.
   * @param {string} payload.password user password.
   */
  async create(payload) {
    try {
      const created = await User.create({ ...payload });

      return {
        id: created.id,
        created: true,
      };
    } catch (error) {
      console.log(`unable to create a new company condition`);
    }
  },
};

module.exports = { userRepository };
