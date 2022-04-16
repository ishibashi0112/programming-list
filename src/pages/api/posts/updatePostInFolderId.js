import { getSession } from "next-auth/react";
import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const session = await getSession({ req });
  console.log(req.body);

  if (!session) {
    res.status(401);
    res.end();
  }

  await prisma.post.update({
    where: { id: req.body.post_id },
    data: {
      folder_id: req.body.updated_folder_id,
    },
  });

  res.end();
};
