import { Skeleton } from "@mantine/core";
import React from "react";
import { usePostsByFolderId } from "src/hooks/usePostsByFolderId";
import { AiOutlineFolder } from "react-icons/ai";
import { useRouter } from "next/router";
import { PostsLink } from "src/components/Posts/PostsLink";
import { ImFileEmpty } from "react-icons/im";
import { useCreateSkeletonEl } from "src/hooks/useCreateSkeletonEl";

export const Posts = () => {
  const router = useRouter();
  const { data: posts, error, isLoading, isEmpty } = usePostsByFolderId();
  const { skeletonEl } = useCreateSkeletonEl(router.query.postsLength);

  if (isLoading) {
    return (
      <div className="w-full p-4  ">
        <div className="py-1 px-3 dark:bg-neutral-900 dark:rounded-t-lg ">
          <Skeleton className="h-7 w-24 mb-5 rounded-md" />
          <div className="flex flex-wrap justify-center gap-4 p-5">
            {skeletonEl.map((el) => el)}
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  if (isEmpty) {
    return (
      <div className="h-[calc(100vh-48px)] flex justify-center items-center opacity-50">
        <div className="flex text-2xl text-gray-500">
          <p className="flex items-center mr-1">
            <ImFileEmpty />
          </p>
          <p>No Post</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <h1 className="flex items-center py-1 px-3  font-bold text-lg dark:text-gray-400 dark:bg-neutral-900 dark:rounded-t-lg  ">
        <p className="flex items-center">
          <AiOutlineFolder />
        </p>
        <p className=" pr-1">{router.query?.folderName}</p>

        <p className=""> {`${posts.length}件`}</p>
      </h1>

      <PostsLink posts={posts} />
    </div>
  );
};
