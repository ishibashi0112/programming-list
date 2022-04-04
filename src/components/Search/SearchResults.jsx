import { Highlight, Loader } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { BsHash } from "react-icons/bs";
import { useSearchPost } from "src/hooks/useSearchPost";

export const SearchResults = (props) => {
  const { data: posts, error, isLoading, isEmpty } = useSearchPost(props.value);
  console.log(posts);

  if (isLoading) {
    return (
      <div className=" w-96 h-10 flex justify-center items-center  bg-white  border shadow z-[100]">
        <Loader size="sm" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="z-[100] w-96 bg-white  border shadow">
        {error.message}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className=" w-96 h-10 flex justify-center items-center  bg-white  border shadow z-[100]">
        {"検索結果0件"}
      </div>
    );
  }

  return (
    <div className="bg-white  border rounded-b-md ">
      <ul>
        <li className="p-1 border-b">{`検索結果${posts.length}件`}</li>
        {posts.map((post) => (
          <li
            className="p-2 m-1 rounded-md transition hover:transition hover:bg-gray-200"
            key={post.id}
          >
            <Link href={post.url}>
              <a target="_blank" rel="noopener noreferrer">
                <p className="font-bold truncate">
                  <Highlight highlight={props.value}>{post.name}</Highlight>
                </p>
                <p className="text-gray-500 text-sm truncate">{post.url}</p>
              </a>
            </Link>
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  className="flex items-center bg-gray-500 h-5 max-w-[120px] px-1 text-white  rounded-xl text-xs truncate "
                  key={tag.id}
                >
                  <div className="flex">
                    <p className="flex items-center">
                      <BsHash />
                    </p>
                    <p>
                      <Highlight
                        className="text-xs "
                        highlight={props.value}
                        highlightColor="dark"
                      >
                        {tag.name}
                      </Highlight>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
