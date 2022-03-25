import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const folder = await prisma.folder.findMany({
    include: {
      posts: {
        select: {
          id: true,
        },
      },
    },
  });

  if (folder) {
    res.status(200).json(folder);
  }
};
