import { getSession } from "next-auth/react";
import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401);
    res.end();
  }

  const memo = await prisma.memo.update({
    where: { id: req.body.id },
    data: {
      body: req.body.body,
    },
  });
  console.log(memo);
  res.json(memo);
};
