import { Loader } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { usePostsByTagId } from "src/hooks/usePostsByTagId";
import { TagLink } from "src/components/Tag/TagLink";
import { useRouter } from "next/router";
import { BsHash } from "react-icons/bs";

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
          <p className=" pr-1">{`${router.query?.tagName}`}</p>
        </div>
        <p className="text-lg font-bold"> {`${posts.length}件`}</p>
      </h1>

      <ul className="flex flex-wrap gap-4   ">
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
                    <TagLink key={tag.id} tagId={tag.id} tagName={tag.name} />
                  ))}
                </ul>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
