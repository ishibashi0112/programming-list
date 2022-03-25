import { Accordion, Button, Loader, TextInput } from "@mantine/core";
import { formList, useForm } from "@mantine/form";
import Link from "next/link";
import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useFolders } from "src/hooks/useFolders";
import { useSWRConfig } from "swr";

export const Folder = () => {
  const { mutate } = useSWRConfig();
  const { data: folders, error, isLoading } = useFolders();

  const createFolder = async (value) => {
    const folderName = { name: value };
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(folderName),
    };
    const res = await fetch("/api/createFolder", params);
    const json = await res.json();
    console.log(json);
    mutate("/api/folders/findAllFolder");
  };

  const form = useForm({
    initialValues: { folder: formList([]) },
  });

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

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-48px)] w-1/5 border-r border-black flex justify-center items-center">
        <Loader size="sm" />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="min-h-[calc(100vh-48px)] w-1/5 border-r border-black">
      <Accordion iconSize={18} multiple>
        <Accordion.Item label="Memo"></Accordion.Item>

        <Accordion.Item label="URL">
          <ul>
            {folders.map((folder) => (
              <li
                className=" transition hover:transition hover:bg-gray-100"
                key={folder.id}
              >
                <Link href={`/posts/${folder.id}`}>
                  <a className="flex justify-between px-2">
                    <p>{folder.name}</p>
                    <p>{folder.posts.length ? folder.posts.length : null}</p>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
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
              <AiOutlinePlusCircle />
              <p className="ml-1">新規フォルダ</p>
            </Button>
          </div>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
