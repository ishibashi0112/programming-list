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
      <div className="p-4 w-full  ">
        <div className="py-1 px-3 dark:bg-neutral-900 dark:rounded-t-lg ">
          <Skeleton className="mb-5 w-24 h-7 rounded-md" />
          <div className="flex flex-wrap gap-4 justify-center p-5">
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
      <div className="flex justify-center items-center h-[calc(100vh-48px)] opacity-50">
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
    <div className="p-4 w-full">
      <h1 className="flex items-center py-1 px-3  text-lg font-bold dark:text-gray-400 dark:bg-neutral-900 dark:rounded-t-lg  ">
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
