import { getSession } from "next-auth/react";
import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401);
    res.end();
  }

  const post = req.body.data;

  if (post.tags.length) {
    await prisma.post.update({
      where: { id: post.id },
      data: { tags: { set: [] } },
    });
  }

  await prisma.post.delete({
    where: { id: post.id },
  });

  res.end();
};
