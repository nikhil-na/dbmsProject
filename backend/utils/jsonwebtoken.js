const jwt = require("jsonwebtoken");

const createJwt = (userId, email) => {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = createJwt(user.id, user.email);

  const options = {
    expiresIn: process.env.JWT_COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  res.cookie("jwt", token, options);

  res.status(statusCode).json({
    status: "Success",
    token,
  });
};

module.exports = sendTokenResponse;
