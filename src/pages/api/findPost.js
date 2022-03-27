import { prisma } from "src/utils/prismaClient";

//folder_idとtag_idに応じて条件分岐
export default async (req, res) => {
  if (req.query.folder_id) {
    const forderId = Number(req.query.folder_id);
    const postsbyforderId = await prisma.post.findMany({
      where: {
        folder_id: forderId,
      },
      include: { tags: true },
    });

    res.json(postsbyforderId);
  } else {
    const tagId = Number(req.query.tag_id);
    const postsbyTagId = await prisma.post.findMany({
      where: {
        tags: { some: { id: { equals: tagId } } },
      },
      include: { tags: true },
    });

    res.json(postsbyTagId);
  }
};
