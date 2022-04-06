import { Button, Loader, Overlay, Skeleton } from "@mantine/core";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useMemo as useMemoId } from "src/hooks/useMemo";
import RichTextEditor from "src/components/RichTextEditorImport";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useSWRConfig } from "swr";
import { useDeleteFetchModal } from "src/hooks/useDeleteFetchModal";

export const Memo = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data: memo, error, isLoading } = useMemoId();
  const [text, setText] = useState("");
  const [isEdit, setIsEdit] = useState(true);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const { deleteModal, setDeleteModalData, setIsModalOpened } =
    useDeleteFetchModal();

  const handleClickEdit = useCallback(() => {
    setIsEdit(false);
  }, []);

  const handleClickEditCancel = useCallback(() => {
    setText(memo.body);
    setIsEdit(true);
  }, [memo]);

  const handleClickSave = useCallback(async () => {
    setIsEditLoading(true);
    const memoParams = { id: router.query.id, body: text };
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memoParams),
    };
    await fetch("/api/memos/updateMemo", params);
    await mutate("/api/memos/findAllMemo");
    setIsEdit(true);
    setIsEditLoading(false);
  }, [router, text]);

  const handleClickRemove = useCallback(async () => {
    setDeleteModalData({
      apiUrl: "/api/memos/deleteMemo",
      mutateUrls: ["/api/memos/findAllMemo"],
      fetchData: memo,
      titleValue: "このメモ",
      redirectUrl: "/",
    });
    setIsModalOpened(true);
  }, [memo]);

  useEffect(() => {
    if (memo) {
      setText(memo.body);
    }
  }, [memo]);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex p-2">
          <Skeleton className="h-9 w-24 mr-2" />
          <Skeleton className="h-9 w-24" />
        </div>
        <Skeleton className="h-[300px] mt-4  " />
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="p-4 dark:bg-black">
      <div>
        {!isEdit ? (
          isEditLoading ? (
            <div className="p-2 ml-5 h-9">
              <Loader color="gray" variant="dots" />
              <Overlay opacity={0} color="#000" />
            </div>
          ) : (
            <div className="p-2 dark:bg-neutral-900 dark:rounded-md">
              <Button
                className="mr-2 "
                variant="outline"
                onClick={handleClickSave}
              >
                save
              </Button>
              <Button variant="subtle" onClick={handleClickEditCancel}>
                ×cancel
              </Button>
            </div>
          )
        ) : (
          <div className="p-2 dark:bg-neutral-900 dark:rounded-md">
            <Button
              className="mr-2 dark:hover:bg-neutral-700"
              variant="subtle"
              onClick={handleClickEdit}
            >
              <p>
                <AiOutlineEdit />
              </p>
              <p> edit </p>
            </Button>

            <Button
              className="relative dark:hover:bg-neutral-700"
              color={"red"}
              variant="subtle"
              onClick={handleClickRemove}
            >
              <p>
                <AiOutlineDelete />
              </p>
              <p>remove</p>
            </Button>
          </div>
        )}
      </div>

      <RichTextEditor
        classNames={{
          root: "mt-8 min-h-[300px] dark:bg-neutral-700	dark:border-neutral-700 dark:text-gray-300 ",
          toolbar: "dark:bg-neutral-800	dark:border-neutral-800",
          toolbarInner: "your-toolbarInner-class",
          toolbarGroup: "your-toolbarGroup-class",
          toolbarControl:
            "dark:bg-neutral-600	dark:border-neutral-600 dark:text-gray-300",
        }}
        controls={[
          ["bold", "h2", "italic", "underline", "strike"],
          ["unorderedList", "orderedList"],
          ["link", "codeBlock", "image"],
        ]}
        value={text}
        onChange={setText}
        readOnly={isEdit}
      />

      {deleteModal}
    </div>
  );
};
