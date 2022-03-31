import { Loader } from "@mantine/core";
import React from "react";
import { usePostsByFolderId } from "src/hooks/usePostsByFolderId";
import { AiOutlineFolder } from "react-icons/ai";
import { useRouter } from "next/router";
import { PostsLink } from "src/components/Posts/PostsLink";
import { ImFileEmpty } from "react-icons/im";

export const Posts = () => {
  const router = useRouter();
  const { data: posts, error, isLoading, isEmpty } = usePostsByFolderId();
  console.log(posts);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-48px)] flex justify-center items-center">
        <Loader size="sm" />
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
