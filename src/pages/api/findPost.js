import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const forderId = Number(req.query.folder_id);
  const postsbyforderId = await prisma.post.findMany({
    where: {
      folder_id: forderId,
    },
    include: { tags: true },
  });

  if (postsbyforderId) {
    res.status(200).json(postsbyforderId);
  }
};
