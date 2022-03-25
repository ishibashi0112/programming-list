import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const orderArray = req.body.tags.map((name) => {
    return { where: { name }, create: { name } };
  });

  const post = await prisma.post.create({
    data: {
      folder_id: Number(req.body.folder_id),
      url: req.body.url,
      name: req.body.name,
      tags: {
        connectOrCreate: orderArray,
      },
    },
  });
  res.status(200).json(post);
};
