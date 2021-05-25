const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { name, address, country } = req.body;
  const result = await prisma.ejen.create({
    data: {
      name: name,
      address: address,
      country: country,
    },
  });

  res.json(result);
}
