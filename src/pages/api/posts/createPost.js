import { getSession } from "next-auth/react";
import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401);
    res.end();
  }

  const orderArray = req.body.tags.map((name) => {
    return { where: { name }, create: { name, user_id: session.userId } };
  });

  const post = await prisma.post.create({
    data: {
      user_id: session.userId,
      folder_id: req.body.folder_id,
      image_url: req.body.image_url,
      url: req.body.url,
      name: req.body.name,
      tags: {
        connectOrCreate: orderArray,
      },
    },
  });
  res.json(post);
};
