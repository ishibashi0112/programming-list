import { Loader } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { BsHash } from "react-icons/bs";

export const TagLink = (props) => {
  return (
    <li
      className="bg-gray-500 text-white px-1 py-[0.1rem] rounded-xl text-sm hover:border-blue-400 hover:bg-blue-400 active:opacity-70"
      key={props.tagId}
    >
      <Link
        href={{
          pathname: `/tags/${props.tagId}`,
          query: { tagName: props.tagName },
        }}
      >
        <a className="flex">
          <p className="flex items-center">
            <BsHash />
          </p>
          <p className="pr-1">{props.tagName}</p>
        </a>
      </Link>
    </li>
  );
};
