import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const posts = await prisma.post.findMany();

  if (posts) {
    res.status(200).json(posts);
  }
};
