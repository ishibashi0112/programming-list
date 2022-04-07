import { getSession } from "next-auth/react";
import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const session = await getSession({ req });
  console.log(req.body);

  if (!session) {
    res.status(401);
    res.end();
  }

  const updateOrCreateTagArray = req.body.updateTags.map((tagName) => {
    return {
      where: { name: tagName },
      create: { name: tagName, user_id: session.userId },
    };
  });

  const deleteTagArray = req.body.deleteTags.map((tagName) => ({
    name: tagName,
  }));

  await prisma.post.update({
    where: { id: req.body.post_id },
    data: {
      name: req.body.name,
    },
  });

  if (updateOrCreateTagArray.length) {
    await prisma.post.update({
      where: { id: req.body.post_id },
      data: {
        tags: {
          connectOrCreate: updateOrCreateTagArray,
        },
      },
    });
  }

  if (deleteTagArray.length) {
    await prisma.post.update({
      where: { id: req.body.post_id },
      data: {
        tags: {
          disconnect: deleteTagArray,
        },
      },
    });
  }

  res.end();
};
