const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { location } = req.body;
  const result = await prisma.ejen.findMany({
    where: {
      OR: [
        {
          address: {
            contains: location,
          },
        },
        {
          coverage_location: {
            contains: location,
          },
        },
      ],
    },
  });

  res.json(result);
}
