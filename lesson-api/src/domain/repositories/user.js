const { User } = require("../../infrastructure/database/models/user");
const { paginate } = require("../../application/helpers/paginate");

const userRepository = {
  /**
   * @param  {Number} page current page
   * @param  {Number} pageSize limit of the register per page
   * @param  {Object} query query search parameters
   */
  async findAll(page = 1, pageSize = 5, query) {
    try {
      const users = await User.findAll(
        paginate({ where: { ...query } }, { page, pageSize })
      );

      console.log(users);

      if (!users || !users.length) return [];

      return users;
    } catch (error) {
      console.log(`unable to find all users because error: ${error}`);
    }
  },

  /**
   *
   * @param {Number} id
   */
  async findOne(id) {
    try {
      const user = User.findOne({ where: { id } });
      return user;
    } catch (error) {
      console.log(`unable to find a specific user because error: ${error}`);
      return null;
    }
  },

  /**
   * @param {Object} payload user payload.
   * @param {String} payload.firstName user first name.
   * @param {String} payload.lastName user last name.
   * @param {String} payload.email user email address.
   * @param {String} payload.phoneNumber user phone number.
   * @param {String} payload.password user password.
   */
  async create(payload) {
    try {
      const created = await User.create({ ...payload });

      return {
        created: true,
        id: created.id,
      };
    } catch (error) {
      console.log(`unable to create a new user because error: ${error}`);
      return {
        created: false,
        id: null,
      };
    }
  },

  /**
   * @param {Number} id user id.
   * @param {Object} payload user payload.
   * @param {String} payload.firstName user first name.
   * @param {String} payload.lastName user last name.
   * @param {String} payload.email user email address.
   * @param {String} payload.phoneNumber user phone number.
   * @param {String} payload.password user password.
   */
  async update(id, payload) {
    try {
      await User.update({ ...payload }, { where: { id } });
      return { updated: true, id };
    } catch (error) {
      console.log(`unable to update user because error: ${error}`);
      return { updated: false, id: null };
    }
  },

  /**
   *
   * @param {Number} id
   */
  async destroy(id) {
    try {
      await User.destroy({ where: { id } });
      return { destroyed: true, id };
    } catch (error) {
      console.log(`unable to destroy user because error: ${error}`);
      return { destroyed: false, id: null };
    }
  },
};

module.exports = { userRepository };
