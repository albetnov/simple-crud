const { compareSync } = require("bcryptjs");
const interceptRequest = require("../helpers/interceptRequest");
const makeToken = require("../helpers/makeToken");
const UserRepository = require("../repositories/UserRepository");
const LoginRequest = require("../requests/LoginRequest");
const RegisterRequest = require("../requests/RegisterRequest");
const DataNotFound = require("../responses/DataNotFound");

const AuthenticationService = {
  async login(req, res) {
    const data = await interceptRequest(req, res, LoginRequest);
    const find = await UserRepository.findByUsername(data.username);

    if (data.hasError) {
      return data.error;
    }

    if (!find) {
      return DataNotFound(res);
    }

    if (!compareSync(data.password, find.password)) {
      return res.status(404).json({ message: "Invalid cresidentials" });
    }

    const date = new Date();

    return res.json({
      message: "Authentication success",
      token: makeToken({ username: find.username, name: find.name, roles: find.roles }),
      expiresIn: date.setDate(date.getDate() + 7),
    });
  },
  async register(req, res) {
    const data = await interceptRequest(req, res, RegisterRequest);

    if (data.hasError) {
      return data.error;
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