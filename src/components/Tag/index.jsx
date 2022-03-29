import { Loader } from "@mantine/core";
import React from "react";
import { usePostsByTagId } from "src/hooks/usePostsByTagId";
import { useRouter } from "next/router";
import { BsHash } from "react-icons/bs";
import { PostsLink } from "../Posts/PostsLink";

export const Tag = () => {
  const router = useRouter();
  const { data: posts, error, isLoading } = usePostsByTagId();
  console.log(posts);

  if (isLoading) {
    return (
      <div className="w-4/5 h-[calc(100vh-48px)] flex justify-center items-center">
        <Loader size="sm" />
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="flex items-center mb-5">
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
