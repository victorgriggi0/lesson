const { Role } = require("../../infrastructure/database/models/role");

const roleRepository = {
  /**
   * @param  {number} page current page
   * @param  {number} limit limit of the register per page
   */
  async findAll(page, limit) {
    try {
      const roles = await Role.findAll();

      if (!roles || !roles.length) return [];

      return roles;
    } catch (error) {
      console.log(`unable to find all roles because error: ${error}`);
    }
  },

  /**
   * @param  {number} id user id
   */
  async findOne(id) {
    try {
      const role = await Role.findOne({ where: { id } });

      if (!role) return null;

      return role;
    } catch (error) {
      console.log(`unable to find a specific role because error: ${error}`);
    }
  },

  /**
   * @param {Object} payload role payload.
   * @param {string} payload.name role name.
   * @param {string} payload.description role description.
   */
  async create(payload) {
    const created = await Role.create({ ...payload });

    return {
      id: created.id,
      created: true,
    };
  },
};

module.exports = { roleRepository };
