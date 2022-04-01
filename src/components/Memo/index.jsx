import { Button, Dialog, Loader, Modal } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMemo as useMemoId } from "src/hooks/useMemo";
import RichTextEditor from "src/components/RichTextEditorImport";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useSWRConfig } from "swr";

export const Memo = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data: memo, error, isLoading } = useMemoId();
  const [text, setText] = useState("");
  const [isEdit, setIsEdit] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);

  const handleClickEdit = () => {
    setIsEdit(isEdit ? false : true);
  };

  const handleClickSave = async () => {
    const memoParams = { id: router.query.id, body: text };
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memoParams),
    };
    await fetch("/api/memos/updateMemo", params);
    setIsEdit(true);
    mutate("/api/memos/findAllMemo");
  };

  const handleClickRemove = async () => {
    const memoId = { id: router.query.id };
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memoId),
    };
    await fetch("/api/memos/deleteMemo", params);
    mutate("/api/memos/findAllMemo");
    router.push("/");
  };

  useEffect(() => {
    if (memo) {
      setText(memo.body);
    }
  }, [memo]);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-48px)] flex justify-center items-center">
        <Loader size="sm" />
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center">
        {!isEdit && (
          <Button className="" variant="outline" onClick={handleClickSave}>
            save
          </Button>
        )}
        <Button variant="subtle" onClick={handleClickEdit}>
          <p>{isEdit ? <AiOutlineEdit /> : "×"}</p>
          <p>{isEdit ? "edit" : "cancel"}</p>
        </Button>
        {isEdit && (
          <Button
            className="relative"
            variant="subtle"
            // onClick={handleClickRemove}
            onClick={() => setModalOpened(true)}
          >
            <p>
              <AiOutlineDelete />
            </p>
            <p>remove</p>
          </Button>
        )}
      </div>

      <Modal
        classNames={{
          root: "your-root-class",
          inner: "your-inner-class",
          modal: "w-60",
          header: "justify-center",
          overlay: " opacity-0",
          title: "justify-center",
          body: "your-body-class",
          close: "your-close-class",
        }}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="メモを削除しますか？"
        size="xs"
        shadow="xs"
        withCloseButton={false}
      >
        <div className="flex justify-center ">
          <Button className="m-1" variant="outline" onClick={handleClickRemove}>
            yes
          </Button>
          <Button
            className="m-1"
            variant="outline"
            onClick={() => setModalOpened(false)}
          >
            no
          </Button>
        </div>
      </Modal>

      <RichTextEditor
        className="mt-4 min-h-[300px]"
        value={text}
        onChange={setText}
        readOnly={isEdit}
      />
    </div>
  );
};
