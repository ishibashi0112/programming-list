import { Button, Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useMemos } from "src/hooks/useMemos";
import { AiOutlineFileAdd } from "react-icons/ai";

export const MemoItem = () => {
  const router = useRouter();
  const { data: memos, error, isLoading } = useMemos();

  const handleClickNewMemo = useCallback(() => {
    router.push({ pathname: "/", query: { tabKey: "memo" } });
  }, [router]);

  if (isLoading) {
    return (
      <div className="">
        <Loader size="sm" />
      </div>
    );
  }

  if (error) {
    return <div>エラーが発生しました。</div>;
  }

  return (
    <>
      <div>
        <Button
          className="p-0"
          compact
          variant="subtle"
          onClick={handleClickNewMemo}
        >
          <AiOutlineFileAdd className="text-lg" />
          <p className="ml-1">New Memo</p>
        </Button>
        <ul>
          {memos.map((memo) => (
            <li
              className={`${
                router.query?.id === memo.id
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              } p-1 rounded-sm transition  hover:transition`}
              key={memo.id}
            >
              <Link href={`/memos/${memo.id}`}>
                <a>
                  <p className="truncate">
                    {memo.body.replace(/(<([^>]+)>)/gi, "")}
                  </p>
                  <p className="text-sm text-gray-500">2022年3月31日 13:00</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
