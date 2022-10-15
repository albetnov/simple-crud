const { sign } = require("jsonwebtoken");

const makeToken = (data) => {
  return sign(data, process.env.APP_KEY, { expiresIn: "7d" });
};

module.exports = makeToken;
