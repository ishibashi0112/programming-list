import { Button, Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useFolders } from "src/hooks/useFolders";
import { useMemos } from "src/hooks/useMemos";
import { AiOutlineFileAdd } from "react-icons/ai";

export const MemoItem = () => {
  const router = useRouter();
  const {
    data: folders,
    error: folderError,
    isLoading: folderLoading,
  } = useFolders();
  const { data: memos, error: memoError, isLoading: memoLoading } = useMemos();

  const handleClickNewMemo = useCallback(() => {
    router.push({ pathname: "/", query: { tabKey: "memo" } });
  }, [router]);

  if (folderLoading || memoLoading) {
    return (
      <div className="min-h-[calc(100vh-48px)] w-1/5 border-r border-black flex justify-center items-center">
        <Loader size="sm" />
      </div>
    );
  }

  if (folderError || memoError) {
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
