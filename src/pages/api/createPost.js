import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const folder = await prisma.post.create({
    data: {
      folder_id: req.body.folder_id,
      url: req.body.url,
      name: req.body.name,
    },
  });
  res.status(200).json(folder);
};
