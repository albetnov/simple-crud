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
      status: 200,
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
  async deleteSelf(req, res) {
    await UserRepository.delete(req.user.id);
    return res.json({ message: "User deleted successfully", status: 200 });
  },
  async detail(req, res) {
    const { id } = req.params;
    const user = await UserRepository.findById(parseInt(id));

    if (!user) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }

    delete user.password;
    return res.json({ message: "User Detail", data: user, status: 200 });
  },
};

module.exports = UserService;
