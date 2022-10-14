const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const UserRepository = {
  async findByUsername(username) {
    return await prisma.users.findFirst({ where: { username } });
  },
  async create(data) {
    return await prisma.users.create({ data });
  },
};

module.exports = UserRepository;
