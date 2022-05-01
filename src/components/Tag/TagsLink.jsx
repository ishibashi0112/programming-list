import { Badge, Button, Popover } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import Link from "next/link";
import React from "react";
import { BsHash } from "react-icons/bs";
import { useState } from "react";

export const TagsLink = (props) => {
  const [opened, setOpened] = useState(false);
  const { ref, height } = useElementSize();

  if (props.post.tags.length === 0) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400 dark:bg-neutral-700">
        No Tag
      </div>
    );
  }

  return (
    <div className="dark:py-1 dark:bg-neutral-700 dark:rounded-b-lg">
      {height < 24 ? (
        <ul className="flex flex-wrap gap-1 px-1" ref={ref}>
          {props.post.tags.map((tag) => (
            <li key={tag.id}>
              <Link
                href={{
                  pathname: `/tags/${tag.id}`,
                  query: { tagName: tag.name },
                }}
              >
                <a className="flex">
                  <Badge
                    className="normal-case	hover:bg-blue-400 hover:border-blue-400 active:opacity-70"
                    leftSection={<BsHash />}
                    color="gray"
                    variant="filled"
                  >
                    {tag.name}
                  </Badge>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Popover
          classNames={{
            body: "dark:bg-neutral-800 dark:border-neutral-800",
          }}
          opened={opened}
          onClose={() => setOpened(false)}
          target={
            <Button
              className="dark:text-gray-400 dark:hover:bg-neutral-700"
              onClick={() => setOpened((o) => !o)}
              color={"dark"}
              variant="subtle"
              compact
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
              <li key={tag.id}>
                <Link
                  href={{
                    pathname: `/tags/${tag.id}`,
                    query: { tagName: tag.name },
                  }}
                >
                  <a className="flex">
                    <Badge
                      className="normal-case	hover:bg-blue-400 hover:border-blue-400 active:opacity-70"
                      color="gray"
                      leftSection={<BsHash />}
                      variant="filled"
                    >
                      {tag.name}
                    </Badge>
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
