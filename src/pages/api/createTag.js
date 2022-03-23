import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  console.log(req.body);
  const tags = req.body.tags;
  const post_id = req.body.post_id;
  tags.map(async (tag) => {
    await prisma.tag.create({
      data: {
        post_id,
        name: tag,
      },
    });
  });

  res.status(200);
};
