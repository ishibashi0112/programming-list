import { Accordion, Loader } from "@mantine/core";
import React from "react";
import { useFolders } from "src/hooks/useFolders";
import { useMemos } from "src/hooks/useMemos";
import { UrlItem } from "src/components/SideBar/UrlItem";
import { MemoItem } from "src/components/SideBar/MemoItem";

// export const get

export const SideBar = () => {
  const {
    data: folders,
    error: folderError,
    isLoading: folderLoading,
  } = useFolders();
  const { data: memos, error: memoError, isLoading: memoLoading } = useMemos();

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
    <div className="max-h-[calc(100vh-48px)]  w-1/5 border-r border-black">
      <Accordion
        classNames={{
          content: "h-[70vh] overflow-y-auto",
        }}
        iconSize={18}
        initialItem={0}
        iconPosition="right"
      >
        <Accordion.Item label="URL">
          <UrlItem />
        </Accordion.Item>

        <Accordion.Item label="Memo">
          <MemoItem />
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
