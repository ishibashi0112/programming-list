import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const keyword = req.query.keyword;
  const posts = await prisma.post.findMany({
    where: {
      name: { contains: keyword },
    },
    // where:{},
    include: { tags: true },
  });
  console.log(posts);

  res.json(posts);
};
