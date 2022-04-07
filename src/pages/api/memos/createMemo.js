import { getSession } from "next-auth/react";
import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const memo = await prisma.memo.create({
      data: {
        user_id: session.userId,
        body: req.body.memo,
      },
    });

    res.json(memo);
  } else {
    res.status(401);
    res.end();
  }
};
