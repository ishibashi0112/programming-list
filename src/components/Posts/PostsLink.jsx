import Link from "next/link";
import React from "react";
import { TagsLink } from "src/components/Tag/TagsLink";
import Image from "next/image";

export const PostsLink = (props) => {
  return (
    <ul className="flex flex-wrap gap-4 ">
      {props.posts.map((post) => (
        <li
          className="w-64 h-64 border rounded-md shadow transition hover:transition hover:opacity-80 "
          key={post.id}
        >
          <Link href={post.url}>
            <a
              className="block group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="flex-1 h-36  relative ">
                <Image
                  className=" rounded-t-md"
                  src={"/images/noImage.png"}
                  alt="Picture of the author"
                  layout="fill"
                />
              </p>
              <div className=" p-1">
                <p className="font-bold text-lg">{post.name}</p>
                <p className="text-sm text-gray-500 transition group-hover:transition group-hover:text-blue-400 truncate">
                  {post.url}
                </p>
              </div>
            </a>
          </Link>

          <TagsLink post={post} />
        </li>
      ))}
    </ul>
  );
};
