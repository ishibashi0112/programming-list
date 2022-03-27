import { Loader } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { usePostsByFolderId } from "src/hooks/usePostsByFolderId";
import { BsHash } from "react-icons/bs";

export const Post = () => {
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
    <ul className="flex flex-wrap gap-4  p-4 ">
      {posts.map((post) => (
        <li
          className="w-96 h-64 border rounded-md shadow transition hover:transition hover:opacity-80 "
          key={post.id}
        >
          <Link href={post.url}>
            <a
              className="block p-1 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="font-bold text-lg">{post.name}</p>
              <p className="text-sm text-gray-500 transition group-hover:transition group-hover:text-blue-400 truncate">
                {post.url}
              </p>
              <ul className="flex gap-2">
                {post.tags.map((tag) => (
                  <li
                    className="bg-gray-500 text-white px-1 py-[0.1rem] rounded-xl text-sm"
                    key={tag.id}
                  >
                    <div className="flex">
                      <p className="flex items-center">
                        <BsHash />
                      </p>
                      <p className="pr-1">{tag.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};