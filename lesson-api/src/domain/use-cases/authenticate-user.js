const jwt = require("jsonwebtoken");

const authenticateUser = async (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN_MS,
  });

  return { accessToken };
};

module.exports = { authenticateUser };
