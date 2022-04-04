import { Button, Popover } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import Link from "next/link";
import React from "react";
import { BsHash } from "react-icons/bs";
import { useState } from "react";

export const TagsLink = (props) => {
  const [opened, setOpened] = useState(false);
  const { ref, height } = useElementSize();

  if (props.post.tags.length === 0) {
    return <div className="text-sm text-gray-500">No Tag</div>;
  }

  // if (height === 0) {
  //   return <div></div>;
  // }

  return (
    <div>
      {height < 24 ? (
        <ul className="flex flex-wrap gap-1 px-1" ref={ref}>
          {props.post.tags.map((tag) => (
            <li
              className="bg-gray-500 text-white px-1 py-[0.1rem] rounded-xl text-sm hover:border-blue-400 hover:bg-blue-400 active:opacity-70"
              key={tag.id}
            >
              <Link
                href={{
                  pathname: `/tags/${tag.id}`,
                  query: { tagName: tag.name },
                }}
              >
                <a className="flex">
                  <p className="flex items-center">
                    <BsHash />
                  </p>
                  <p className="pr-1 max-w-[200px] truncate">{tag.name}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Popover
          opened={opened}
          onClose={() => setOpened(false)}
          target={
            <Button
              onClick={() => setOpened((o) => !o)}
              color={"dark"}
              variant="subtle"
            >
              ...タグを全て表示
            </Button>
          }
          width={260}
          position="bottom"
          withArrow
        >
          <ul className={"flex flex-wrap gap-1 px-1 "}>
            {props.post.tags.map((tag) => (
              <li
                className="bg-gray-500 text-white px-1 py-[0.1rem] rounded-xl text-sm hover:border-blue-400 hover:bg-blue-400 active:opacity-70"
                key={tag.id}
              >
                <Link
                  href={{
                    pathname: `/tags/${tag.id}`,
                    query: { tagName: tag.name },
                  }}
                >
                  <a className="flex">
                    <p className="flex items-center">
                      <BsHash />
                    </p>
                    <p className="pr-1 max-w-[200px] truncate">{tag.name}</p>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </Popover>
      )}
    </div>
  );
};
