import { prisma } from "src/utils/prismaClient";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401);
    res.end();
  }

  const folder = await prisma.folder.create({
    data: {
      user_id: session.userId,
      name: req.body.name,
    },
  });

  res.json(folder);
};
