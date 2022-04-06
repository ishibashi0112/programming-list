import { Skeleton } from "@mantine/core";
import React from "react";
import { usePostsByTagId } from "src/hooks/usePostsByTagId";
import { useRouter } from "next/router";
import { BsHash } from "react-icons/bs";
import { PostsLink } from "../Posts/PostsLink";

export const Tag = () => {
  const router = useRouter();
  const { data: posts, error, isLoading } = usePostsByTagId();

  if (isLoading) {
    return (
      <div className="w-full p-4 ">
        <Skeleton className="h-7 w-24 mb-5" />
        <div className="flex flex-wrap justify-center gap-3">
          <Skeleton
            className="h-64 w-64 rounded-md"
            sx={(theme) => ({
              backgroundColor: theme.colors.gray[6],
              // colorScheme === "dark" ? theme.colors.gray[6] : "",
            })}
          />
          <Skeleton className="h-64 w-64 rounded-md" />
          <Skeleton className="h-64 w-64 rounded-md" />
          <Skeleton className="h-64 w-64 rounded-md opacity-70" />
          <Skeleton className="h-64 w-64 rounded-md opacity-40" />
          <Skeleton className="h-64 w-64 rounded-md opacity-10" />
        </div>
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="p-4 dark:bg-black">
      <h1 className="flex items-center py-1 px-3 dark:text-gray-400 dark:bg-neutral-900 dark:rounded-t-lg ">
        <div className="flex items-center px-1 py-1 mr-1 text-white text-xl bg-gray-500 rounded-xl ">
          <p className="flex items-center">
            <BsHash />
          </p>
          <p className=" pr-1 max-w-[200px] truncate">{`${router.query?.tagName}`}</p>
        </div>
        <p className="text-lg font-bold"> {`${posts.length}件`}</p>
      </h1>

      <PostsLink posts={posts} />
    </div>
  );
};
