import { prisma } from "src/utils/prismaClient";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    //folder_idとtag_idに応じて条件分岐
    if (req.query.folder_id) {
      const forderId = req.query.folder_id;
      const postsbyforderId = await prisma.post.findMany({
        where: {
          folder_id: forderId,
        },
        include: { tags: true },
      });

      res.json(postsbyforderId);
    } else {
      const tagId = req.query.tag_id;
      const postsbyTagId = await prisma.post.findMany({
        where: {
          tags: { some: { id: { equals: tagId } } },
        },
        include: { tags: true },
      });

      res.json(postsbyTagId);
    }
  } else {
    res.status(401);
  }
};
