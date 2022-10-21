const { PrismaClient } = require("@prisma/client");
const { hashSync } = require("bcryptjs");

const prisma = new PrismaClient();

const UserRepository = {
  async findByUsername(username) {
    return await prisma.users.findFirst({ where: { username } });
  },
  async findById(id) {
    return await prisma.users.findFirst({ where: { id } });
  },
  async create(data) {
    data.password = hashSync(data.password);
    return await prisma.users.create({ data });
  },
  async getAll() {
    return await (
      await prisma.users.findMany({ orderBy: { id: "desc" } })
    ).map((item) => {
      delete item.password;
      return item;
    });
  },
  async update(id, data) {
    return await prisma.users.update({ where: { id: parseInt(id) }, data });
  },
  async delete(id) {
    return await prisma.users.delete({ where: { id: parseInt(id) } });
  },
  async countAll() {
    return await prisma.users.count();
  },
};

module.exports = UserRepository;
