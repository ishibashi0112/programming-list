import { Skeleton } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { usePostsByFolderId } from "src/hooks/usePostsByFolderId";
import { useRouter } from "next/router";
import { PostsLink } from "src/components/Posts/PostsLink";
import { ImFileEmpty } from "react-icons/im";
import { useCreateSkeletonEl } from "src/hooks/useCreateSkeletonEl";
import { useLocalStorage } from "@mantine/hooks";
import { DisplayBar } from "../DisplayBar";

export const Posts = () => {
  const router = useRouter();
  const { data, error, isLoading, isEmpty } = usePostsByFolderId();
  const { skeletonEl } = useCreateSkeletonEl(router.query.postsLength);

  const [posts, setPosts] = useState([]);
  const [display] = useLocalStorage({
    key: "display",
  });

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    // if (display.time === "up") {
    const copyArray = [...posts];
    const reverseTimePosts = copyArray.reverse();
    setPosts(reverseTimePosts);
    // }
  }, [display.time]);

  if (isLoading || posts?.length === undefined) {
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
      <DisplayBar
        posts={{ defaultPosts: data, currentPosts: posts }}
        setPosts={setPosts}
      />

      <PostsLink posts={posts} display={display} />
    </div>
  );
};
