const interceptRequest = require("../helpers/interceptRequest");
const UserRepository = require("../repositories/UserRepository");
const LoginRequest = require("../requests/LoginRequest");
const RegisterRequest = require("../requests/RegisterRequest");
const DataNotFound = require("../responses/DataNotFound");

const AuthenticationService = {
  async login(req, res) {
    const data = await interceptRequest(req, res, LoginRequest);
    const find = await UserRepository.findByUsername(data.username);
    if (!find) {
      return DataNotFound(res);
    }
  },
  async register(req, res) {
    const data = await interceptRequest(req, res, RegisterRequest);

    delete data.confirm_password;
    await UserRepository.create(data);
    res.json({
      message: "Registration Success!",
      status: 200,
    });
  },
};

module.exports = AuthenticationService;
