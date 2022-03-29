import { Loader } from "@mantine/core";
import React from "react";
import { usePostsByFolderId } from "src/hooks/usePostsByFolderId";
import { AiOutlineFolder } from "react-icons/ai";
import { useRouter } from "next/router";
import { PostsLink } from "src/components/Posts/PostsLink";

export const Posts = () => {
  const router = useRouter();
  const { data: posts, error, isLoading, isEmpty } = usePostsByFolderId();
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

  if (isEmpty) {
    return <div>{"ありません"}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="flex items-center mb-5  font-bold text-lg ">
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
