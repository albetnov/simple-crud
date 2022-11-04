const { compareSync } = require("bcryptjs");
const interceptRequest = require("../helpers/interceptRequest");
const makeToken = require("../helpers/makeToken");
const UserRepository = require("../repositories/UserRepository");
const LoginRequest = require("../requests/LoginRequest");
const NewUserRequest = require("../requests/NewUserRequest");
const DataNotFound = require("../responses/DataNotFound");

const AuthenticationService = {
  async login(req, res) {
    const data = await interceptRequest(req, res, LoginRequest);

    if (data.hasError) {
      return data.error;
    }

    const find = await UserRepository.findByUsername(data.value.username);

    if (!find) {
      return DataNotFound(res);
    }

    if (!compareSync(data.value.password, find.password)) {
      return res.status(404).json({ message: "Invalid cresidentials" });
    }

    const date = new Date();

    return res.json({
      message: "Authentication success",
      token: makeToken({
        id: find.id,
        username: find.username,
        name: find.name,
        roles: find.roles,
      }),
      expiresIn: date.setDate(date.getDate() + 7),
      status: 200,
    });
  },
  async register(req, res) {
    const data = await interceptRequest(req, res, NewUserRequest);

    if (data.hasError) {
      return data.error;
    }

    if (data.value.roles !== "admin" && data.value.roles !== "user") {
      return res.status(400).json({
        message: "Role must be admin or user!",
        status: 400,
      });
    }

    delete data.value.confirm_password;
    await UserRepository.create(data.value);

    return res.json({
      message: "Registration Success!",
      status: 201,
    });
  },
};

module.exports = AuthenticationService;
