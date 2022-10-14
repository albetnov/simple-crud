const Joi = require("joi");

const LoginRequest = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = LoginRequest;
