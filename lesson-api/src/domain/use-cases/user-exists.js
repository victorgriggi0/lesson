const { User } = require("../../infrastructure/database/models/user");

/**
 * @param  {object} where
 */
const checkIfUserAlreadyExists = async (where) => {
  const BAD_RESULT = { exists: false, user: null };

  try {
    const user = await User.findOne({ where });

    if (!user) return BAD_RESULT;

    return { exists: true, user };
  } catch (error) {
    console.log(`unable to find user by id because error: ${error}`);
    return BAD_RESULT;
  }
};

module.exports = { checkIfUserAlreadyExists };
