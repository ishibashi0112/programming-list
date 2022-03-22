import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const folder = await prisma.folder.create({
    data: {
      name: req.body.name,
    },
  });
  res.status(200).json(folder);
};
