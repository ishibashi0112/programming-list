import { Button, Loader, Skeleton, TextInput, Tooltip } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback } from "react";
import {
  AiOutlineDelete,
  AiOutlineFolderAdd,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { useDeleteFetchModal } from "src/hooks/useDeleteFetchModal";
import { useFolders } from "src/hooks/useFolders";
import { useSWRConfig } from "swr";

export const UrlItem = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  const [isAppendTextInput, setIsAppendTextInput] = useState(false);
  const [newFolderLoading, setNewFolderLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const { data: folders, error, isLoading } = useFolders();
  console.log(folders);

  const { deleteModal, setDeleteModalData, setIsModalOpened } =
    useDeleteFetchModal();

  const createFolder = async (value) => {
    const folderName = { name: value };
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(folderName),
    };
    const res = await fetch("/api/folders/createFolder", params);
    const json = await res.json();
    console.log(json);
    await mutate("/api/folders/findAllFolder");
  };

  const handleClickNewFolder = useCallback(() => {
    setIsAppendTextInput(true);
  }, []);

  const handleOnChange = useCallback((e) => {
    setText(e.currentTarget.value);
  }, []);

  const handleOnBlur = useCallback(async (e) => {
    const value = e.target.value;
    if (value) {
      setIsAppendTextInput(false);
      setNewFolderLoading(true);
      await createFolder(value);
      setNewFolderLoading(false);
    }
    setIsAppendTextInput(false);
  }, []);

  const handleKeyDown = useCallback(async (e) => {
    const value = e.target.value;
    if (e.keyCode === 13 && value) {
      setIsAppendTextInput(false);
      setNewFolderLoading(true);
      await createFolder(value);
      setNewFolderLoading(false);
    } else if (e.keyCode === 13 && !value) {
      setIsAppendTextInput(false);
    }
  }, []);

  const handleClickNewPost = useCallback(
    (folder) => {
      router.push({
        pathname: "/",
        query: { folderId: folder.id, folderName: folder.name },
      });
    },
    [router]
  );

  const handleClickRemove = useCallback((folder) => {
    setDeleteModalData({
      apiUrl: "/api/folders/deleteFolder",
      mutateUrls: ["/api/folders/findAllFolder"],
      fetchData: folder,
      titleValue: `${folder.name}フォルダー`,
    });
    setIsModalOpened(true);
  }, []);

  useEffect(() => {
    setText("");
  }, [isAppendTextInput]);

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
      <Button
        className="p-0"
        compact
        variant="subtle"
        onClick={handleClickNewFolder}
        disabled={newFolderLoading}
      >
        <AiOutlineFolderAdd className="text-xl" />
        <p className="ml-1">New Folder</p>
      </Button>

      <ul>
        {folders.map((folder) => (
          <li
            className={`${
              router.query?.id === folder.id
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            } group flex justify-between px-2 rounded-sm transition hover:transition `}
            key={folder.id}
          >
            <Link
              href={{
                pathname: `/posts/${folder.id}`,
                query: { folderName: folder.name },
              }}
            >
              <a className="flex-1">
                <p>{folder.name}</p>
              </a>
            </Link>

            <div className="flex justify-between items-center">
              <Button
                className="hidden transition-all text-red-500 hover:bg-red-50 hover:transition-all group-hover:block"
                variant="subtle"
                compact
                onClick={() => handleClickRemove(folder)}
              >
                <Tooltip
                  label={`${folder.name}を削除する`}
                  openDelay={500}
                  className="flex items-center"
                >
                  <AiOutlineDelete />
                </Tooltip>
              </Button>
              <Button
                className="hidden transition-all hover:transition-all group-hover:block"
                variant="subtle"
                compact
                onClick={() => handleClickNewPost(folder)}
              >
                <Tooltip
                  label={`${folder.name}を保存する`}
                  openDelay={500}
                  className="flex items-center"
                >
                  <AiOutlinePlusCircle />
                </Tooltip>
              </Button>

              <p>{folder.posts.length ? folder.posts.length : null}</p>
            </div>
          </li>
        ))}
      </ul>

      {isAppendTextInput ? (
        <TextInput
          className="mb-2"
          sx={{ flex: 1 }}
          value={text}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onKeyDown={handleKeyDown}
          autoFocus={true}
        />
      ) : null}

      <Skeleton
        hidden={!newFolderLoading}
        height={25}
        visible={newFolderLoading}
      />

      {deleteModal}
    </>
  );
};
