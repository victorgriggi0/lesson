const { Company } = require("../../infrastructure/database/models/company");

const userRepository = {
  /**
   * @param  {number} page current page
   * @param  {number} limit limit of the register per page
   */
  async findAll(page, limit) {
    try {
      const companies = await Company.findAll();

      if (!companies || !companies.length) return [];

      return companies;
    } catch (error) {
      console.log(`unable to find all companies because error: ${error}`);
    }
  },

  /**
   * @param  {number} id user id
   */
  async findOne(id) {
    const company = Company.findOne({ where: { id } });

    if (!company) return null;

    return company;
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
      console.log(`unable to create a new company`);
    }
  },
};

module.exports = { userRepository };
