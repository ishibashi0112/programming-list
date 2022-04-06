import { Highlight, Loader } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import React from "react";
import { BsHash } from "react-icons/bs";
import { useSearchPost } from "src/hooks/useSearchPost";

export const SearchResults = (props) => {
  const { data: posts, error, isLoading, isEmpty } = useSearchPost(props.value);
  console.log(posts);

  const [colorScheme] = useLocalStorage({
    key: "color-scheme",
  });

  if (isLoading) {
    return (
      <div className="h-96 flex justify-center items-center  bg-white  border dark:bg-neutral-700 dark:border-neutral-700 ">
        <Loader color="gray" variant="dots" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-96 flex justify-center items-center  bg-white  border dark:bg-neutral-700 dark:border-neutral-700 ">
        <p className="dark:text-gray-400">{error.message}</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="h-96 flex justify-center items-center  bg-white  border dark:bg-neutral-700 dark:border-neutral-700 ">
        <p className="dark:text-gray-400 ">検索結果0件</p>
      </div>
    );
  }

  return (
    <div className="bg-white  border rounded-b-md dark:bg-neutral-700 dark:border-neutral-700 ">
      <ul>
        <li className="p-1 border-b dark:border-neutral-500 dark:text-gray-300">{`検索結果${posts.length}件`}</li>
        {posts.map((post) => (
          <li
            className="p-2 m-1 rounded-md transition hover:transition hover:bg-gray-200 dark:hover:bg-neutral-600"
            key={post.id}
          >
            <Link href={post.url}>
              <a target="_blank" rel="noopener noreferrer">
                <p className="font-bold truncate dark:text-gray-300">
                  <Highlight
                    highlight={props.value}
                    highlightColor={colorScheme === "dark" ? "dark" : "yellow"}
                  >
                    {post.name}
                  </Highlight>
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
