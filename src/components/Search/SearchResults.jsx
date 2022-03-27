import { Highlight, Loader } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { useSearchPost } from "src/hooks/useSearchPost";

export const SearchResults = (props) => {
  const { data: posts, error, isLoading, isEmpty } = useSearchPost(props.value);
  console.log(posts);

  if (isLoading) {
    return (
      <div className=" w-64 h-10 flex justify-center items-center  bg-white  border shadow z-[100]">
        <Loader size="sm" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="z-[100] w-64 bg-white  border shadow">
        {error.message}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className=" w-64 h-10 flex justify-center items-center  bg-white  border shadow z-[100]">
        {"検索結果0件"}
      </div>
    );
  }

  return (
    <div className="z-[100] w-96 bg-white  border shadow">
      <ul>
        <li className="p-1">{`検索結果${posts.length}件`}</li>
        {posts.map((post) => (
          <li className="border-b p-1" key={post.id}>
            <Link href={post.url}>
              <a target="_blank" rel="noopener noreferrer">
                <p className="font-bold truncate">
                  <Highlight highlight={props.value}>{post.name}</Highlight>
                </p>
                <p className="text-gray-500 text-sm truncate">{post.url}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
