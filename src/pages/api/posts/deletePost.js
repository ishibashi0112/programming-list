import { getSession } from "next-auth/react";
import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const post = req.body.post;

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
  } else {
    res.status(401);
  }
};
