import { getSession } from "next-auth/react";
import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401);
    res.end();
  }

  const memoId = req.body.data.id;
  const memo = await prisma.memo.delete({
    where: { id: memoId },
  });

  res.json(memo);
};
