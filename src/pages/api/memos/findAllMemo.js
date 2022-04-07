import { getSession } from "next-auth/react";
import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401);
    res.end();
  }

  const memos = await prisma.memo.findMany({
    where: { user_id: session.userId },
  });

  res.json(memos);
};
