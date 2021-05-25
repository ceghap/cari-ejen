const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const ejens = await prisma.ejen.findMany();

  res.json(ejens);
}
