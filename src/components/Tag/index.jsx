import { Skeleton } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { usePostsByTagId } from "src/hooks/usePostsByTagId";
import { PostsLink } from "../Posts/PostsLink";
import { DisplayBar } from "../DisplayBar";
import { useLocalStorage } from "@mantine/hooks";

export const Tag = () => {
  const { data, error, isLoading } = usePostsByTagId();
  const [posts, setPosts] = useState([]);
  const [format] = useLocalStorage({
    key: "format",
  });
  const [time] = useLocalStorage({
    key: "time",
  });

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const copyArray = [...posts];
    const reverseTimePosts = copyArray.reverse();
    setPosts(reverseTimePosts);
  }, [time]);

  if (isLoading || posts?.length === undefined) {
    return (
      <div className="p-4 w-full ">
        <Skeleton className="mb-5 w-24 h-7" />
        <div className="flex flex-wrap gap-3 justify-center">
          <Skeleton
            className="w-64 h-64 rounded-md"
            sx={(theme) => ({
              backgroundColor: theme.colors.gray[6],
            })}
          />
          <Skeleton className="w-64 h-64 rounded-md" />
          <Skeleton className="w-64 h-64 rounded-md" />
          <Skeleton className="w-64 h-64 rounded-md opacity-70" />
          <Skeleton className="w-64 h-64 rounded-md opacity-40" />
          <Skeleton className="w-64 h-64 rounded-md opacity-10" />
        </div>
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="p-4 dark:bg-black">
      <DisplayBar
        posts={{ defaultPosts: data, currentPosts: posts }}
        setPosts={setPosts}
      />

      <PostsLink posts={posts} format={format} />
    </div>
  );
};
