import { Button, Loader, Modal, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import React, { useState, useCallback } from "react";
import { notifications } from "src/utils/notification";
import { useSWRConfig } from "swr";
import { useFolders } from "./useFolders";

export const useMoveFolderModal = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data: folders } = useFolders();
  const [post, setPost] = useState("");
  const [isMoveFolderModalOpened, setIsMoveFolderModalOpened] = useState(false);
  const [moveFolderLoading, setMoveFolderLoading] = useState(false);
  const foldersSerectData = folders
    ? folders.map((folder) => ({ value: folder.id, label: folder.name }))
    : [];

  const moveFolderForm = useForm({
    initialValues: {
      folder_id: "",
    },
  });

  const handleSubmit = useCallback(
    async (value) => {
      try {
        setMoveFolderLoading(true);
        const bodyParams = {
          post_id: post.id,
          folder_id: post.folder_id,
          updated_folder_id: value.folder_id,
        };

        const params = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyParams),
        };

        const res = await fetch("/api/posts/updatePostInFolderId", params);

        if (!res.ok) {
          throw new Error(`code:${res.status} ${res.statusText}`);
        }

        await mutate("/api/folders/findAllFolder");
        await mutate(`/api/posts/findPost?folder_id=${router.query.id}`);
        await mutate(`/api/posts/findPost?folder_id=${value.folder_id}`);
      } catch (error) {
        notifications("更新時にエラーが発生しました。", error.message);
      } finally {
        moveFolderForm.reset();
        setMoveFolderLoading(false);
        setIsMoveFolderModalOpened(false);
      }
    },
    [moveFolderForm, post]
  );

  return {
    isMoveFolderModalOpened,
    setPost,
    setIsMoveFolderModalOpened,
    moveFolderModal: (
      <Modal
        classNames={{
          header: "mb-0",
          modal: "dark:bg-neutral-800",
          title: "dark:text-gray-400",
        }}
        opened={isMoveFolderModalOpened}
        onClose={() =>
          setIsMoveFolderModalOpened(moveFolderLoading ? true : false)
        }
        title="Move Folder"
        centered
      >
        <p className="mb-2 text-xs text-gray-500  ">
          *移動先のフォルダを選んでください
        </p>
        <p>{post?.name}</p>
        <form
          className="flex flex-col gap-3"
          onSubmit={moveFolderForm.onSubmit(handleSubmit)}
        >
          <Select
            classNames={{
              dropdown: "dark:bg-neutral-700 dark:border-neutral-700 ",
              item: "dark:text-gray-200",
              hovered: "dark:bg-neutral-500",
              value: "bg-neutral-500 dark:text-gray-200",
              searchInput: "dark:bg-neutral-700 ",
              defaultValue: "dark:text-gray-200",
              defaultValueRemove: "dark:text-gray-200",
              defaultVariant: "dark:bg-neutral-700 dark:border-neutral-700",
              input: "dark:text-gray-300",
              label: "dark:text-gray-300",
            }}
            label="FOLDER"
            data={foldersSerectData}
            required
            {...moveFolderForm.getInputProps("folder_id")}
          />

          {moveFolderLoading ? (
            <div className="flex justify-center mt-3">
              <Loader color="gray" variant="dots" />
            </div>
          ) : (
            <Button className="mt-3 bg-blue-400 " type="submit">
              save
            </Button>
          )}
        </form>
      </Modal>
    ),
  };
};
