const Joi = require("joi");

const Unique = require("../helpers/Unique");
const UserRepository = require("../repositories/UserRepository");

class RegisterRequest {
  static rules() {
    return Joi.object({
      name: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required().min(8),
      confirm_password: Joi.ref("password"),
      roles: Joi.string().required(),
    });
  }

  static unique(data) {
    return {
      username: new Unique(UserRepository.findByUsername, data.username),
    };
  }
}

module.exports = RegisterRequest;
