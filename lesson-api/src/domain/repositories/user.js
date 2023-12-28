const { User } = require("../../infrastructure/database/models/user");

const userRepository = {
  /**
   * @param {Object} payload user payload.
   * @param {string} payload.firstName user first name.
   * @param {string} payload.lastName user last name.
   * @param {string} payload.email user email address.
   * @param {string} payload.phoneNumber user phone number.
   * @param {string} payload.password user password.
   */
  async create(payload) {
    console.log(payload);

    const created = await User.create({ ...payload });

    return {
      id: created.id,
      created: true,
    };
  },
};

module.exports = { userRepository };
