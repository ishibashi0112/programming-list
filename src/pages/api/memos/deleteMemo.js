import { getSession } from "next-auth/react";
import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const memo = await prisma.memo.delete({
      where: { id: req.body.id },
    });
    console.log(memo);
    res.json(memo);
  } else {
    res.status(401);
  }
};
