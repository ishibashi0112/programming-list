import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const folder = await prisma.folder.findMany();

  if (folder) {
    res.status(200).json(folder);
  }
};
