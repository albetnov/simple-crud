const interceptRequest = require("../helpers/interceptRequest");
const UserRepository = require("../repositories/UserRepository");
const EditUserRequest = require("../requests/EditUserRequest");
const NewUserRequest = require("../requests/NewUserRequest");

const UserService = {
  async index(req, res) {
    const data = req.query.count ? await UserRepository.countAll() : await UserRepository.getAll();
    return res.json({
      message: "Showing user data",
      data,
    });
  },
  async create(req, res) {
    const data = await interceptRequest(req, res, NewUserRequest);

    if (data.hasError) {
      return data.error;
    }

    delete data.value.confirm_password;
    await UserRepository.create(data.value);

    return res.json({
      message: "Create a new user success",
      status: 201,
    });
  },
  async edit(req, res) {
    const { id } = req.params;

    const data = await interceptRequest(req, res, EditUserRequest);
    if (data.hasError) {
      return data.error;
    }

    await UserRepository.update(id, data.value);
    return res.json({ message: "Data updated successfully.", status: 200 });
  },
  async delete(req, res) {
    const { id } = req.params;
    await UserRepository.delete(id);
    return res.json({ message: "Data deleted successfully.", status: 200 });
  },
  async editSelf(req, res) {
    const data = await interceptRequest(req, res, EditUserRequest);

    if (data.hasError) {
      return data.error;
    }

    await UserRepository.update(req.user.id, data.value);
    return res.json({ message: "User updated successfully", status: 200 });
  },
};

module.exports = UserService;
