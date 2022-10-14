const unique = require("../helpers/unique");
const validate = require("../helpers/validate");
const UserRepository = require("../repositories/UserRepository");
const LoginRequest = require("../requests/LoginRequest");
const RegisterRequest = require("../requests/RegisterRequest");
const DataNotFound = require("../responses/DataNotFound");

const AuthenticationService = {
  async login(req, res) {
    const data = validate(req, res, LoginRequest);
    const find = await UserRepository.findByUsername(data.username);
    if (!find) {
      return DataNotFound(res);
    }
  },
  async register(req, res) {
    const data = validate(req, res, RegisterRequest);
    const uniqueValidation = await unique(UserRepository.findByUsername, data.username);
    if (uniqueValidation) {
      return uniqueValidation.throwErr();
    }

    delete data.confirm_password;
    await UserRepository.create(data);
    res.json({
      message: "Registration Success!",
      status: 200,
    });
  },
};

module.exports = AuthenticationService;
