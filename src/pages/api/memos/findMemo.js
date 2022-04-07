import { prisma } from "src/utils/prismaClient";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401);
    res.end();
  }

  const memo = await prisma.memo.findUnique({
    where: {
      id: req.query.memoId,
    },
  });

  res.json(memo);
};
