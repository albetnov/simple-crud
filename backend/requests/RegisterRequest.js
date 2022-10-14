const Joi = require("joi");

const RegisterRequest = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required().min(8),
  confirm_password: Joi.ref("password"),
  roles: Joi.string().required(),
});

module.exports = RegisterRequest;
