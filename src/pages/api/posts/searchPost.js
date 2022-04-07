import { prisma } from "src/utils/prismaClient";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401);
    res.end();
  }

  const keyword = req.query.keyword;
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { name: { contains: keyword }, user_id: session.userId },

        {
          tags: {
            every: { name: { contains: keyword }, user_id: session.userId },
          },
        },
      ],
    },
    include: { tags: true },
  });
  console.log(posts);

  res.json(posts);
};
