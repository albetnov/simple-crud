const { PrismaClient } = require("@prisma/client");
const { hashSync } = require("bcryptjs");

const prisma = new PrismaClient();

const UserRepository = {
  async findByUsername(username) {
    return await prisma.users.findFirst({ where: { username } });
  },
  async create(data) {
    data.password = hashSync(data.password);
    return await prisma.users.create({ data });
  },
};

module.exports = UserRepository;
