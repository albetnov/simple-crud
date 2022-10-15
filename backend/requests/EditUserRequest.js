const Joi = require("joi");

const Unique = require("../helpers/Unique");
const UserRepository = require("../repositories/UserRepository");

class EditUserRequest {
  static rules() {
    return Joi.object({
      name: Joi.string(),
      username: Joi.string(),
      password: Joi.string().min(8),
      confirm_password: Joi.ref("password"),
      roles: Joi.string(),
    });
  }

  static async unique(data, params) {
    return {
      username: await new Unique(UserRepository.findByUsername, data.username).skipSelf(params.id),
    };
  }
}

module.exports = EditUserRequest;
