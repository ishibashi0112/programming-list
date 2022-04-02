import { getSession } from "next-auth/react";
import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const folder = await prisma.folder.findMany({
      where: { user_id: session.userId },
      include: {
        posts: { include: { tags: true } },
      },
    });

    res.json(folder);
  } else {
    res.status(401);
  }
};
