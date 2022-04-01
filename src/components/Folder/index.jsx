import { Accordion, Button, Loader, TextInput, Tooltip } from "@mantine/core";
import { formList, useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  AiOutlineFileAdd,
  AiOutlineFolderAdd,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { useFolders } from "src/hooks/useFolders";
import { useMemos } from "src/hooks/useMemos";
import { useSWRConfig } from "swr";

export const Folder = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const {
    data: folders,
    error: folderError,
    isLoading: folderLoading,
  } = useFolders();
  const { data: memos, error: memoError, isLoading: memoLoading } = useMemos();

  console.log(router.query.id);

  const form = useForm({
    initialValues: { folder: formList([]) },
  });

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
    mutate("/api/folders/findAllFolder");
  };

  const handleClickNewFolder = () => {
    form.addListItem("folder", { name: "" });
  };

  const handleOnBlur = (e) => {
    const value = e.target.value;
    if (value) {
      createFolder(value);
    }
    form.removeListItem("folder", 0);
  };

  const handleKeyDown = (e) => {
    const value = e.target.value;
    if (e.keyCode === 13 && value) {
      createFolder(value);
      form.removeListItem("folder", 0);
    } else if (e.keyCode === 13 && !value) {
      form.removeListItem("folder", 0);
    }
  };

  const handleClickNewMemo = () => {
    router.push({ pathname: "/", query: { tabKey: "memo" } });
  };

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
    <div className="min-h-[calc(100vh-48px)] w-1/5 border-r border-black">
      <Accordion iconSize={18} multiple initialItem={0} iconPosition="right">
        <Accordion.Item label="URL">
          <div>
            {form.values.folder.length ? (
              <TextInput
                className="mb-2"
                sx={{ flex: 1 }}
                onBlur={handleOnBlur}
                onKeyDown={handleKeyDown}
                autoFocus={true}
                {...form.getListInputProps("folder", 0, "name")}
              />
            ) : null}
            <Button
              className="p-0"
              compact
              variant="subtle"
              onClick={handleClickNewFolder}
              disabled={form.values.folder.length ? true : false}
            >
              <AiOutlineFolderAdd className="text-xl" />
              <p className="ml-1">New Folder</p>
            </Button>
          </div>
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
                  <Link
                    href={{
                      pathname: "/",
                      query: { folderId: folder.id, folderName: folder.name },
                    }}
                  >
                    <a className="hidden mr-1 transition-all hover:transition-all group-hover:block">
                      <Tooltip
                        label={`${folder.name}に保存する`}
                        openDelay={500}
                        className="flex items-center"
                      >
                        <AiOutlinePlusCircle className="text-lg rounded-full  transition-all  hover:text-blue-400 hover:ring-4 hover:ring-gray-300  hover:transition-all" />
                      </Tooltip>
                    </a>
                  </Link>
                  <p>{folder.posts.length ? folder.posts.length : null}</p>
                </div>
              </li>
            ))}
          </ul>
        </Accordion.Item>

        <Accordion.Item label="Memo">
          <div>
            <Button
              className="p-0"
              compact
              variant="subtle"
              onClick={handleClickNewMemo}
              disabled={form.values.folder.length ? true : false}
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
                      <p className="text-sm text-gray-500">
                        2022年3月31日 13:00
                      </p>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
