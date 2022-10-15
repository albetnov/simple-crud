const Joi = require("joi");

class LoginRequest {
    static rules() {
        return Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        });
    }
}

module.exports = LoginRequest;
