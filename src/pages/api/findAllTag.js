import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const Tags = await prisma.tag.findMany();

  if (Tags) {
    res.status(200).json(Tags);
  }
};
