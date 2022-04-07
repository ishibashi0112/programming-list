import { getSession } from "next-auth/react";
import { prisma } from "src/utils/prismaClient";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401);
    res.end();
  }

  const folderId = req.body.data.id;
  const posts = req.body.data.posts;

  if (posts.length) {
    //postsに紐づくtagの関係を切断
    const deletePromiseArray = await Promise.all(
      posts.map(async (post) => {
        if (post.tags.length) {
          await prisma.post.update({
            where: { id: post.id },
            data: { tags: { set: [] } },
          });
        }
      })
    );

    //folderに紐づくpostsをすべて削除
    await prisma.folder.update({
      where: { id: folderId },
      data: { posts: { deleteMany: {} } },
    });
  }

  //対象のfolderを削除
  await prisma.folder.delete({
    where: { id: folderId },
  });

  res.end();
};
