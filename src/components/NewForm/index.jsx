import { TextInput, MultiSelect, Select, Button, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsHash } from "react-icons/bs";
import { useFolders } from "src/hooks/useFolders";
import { useTags } from "src/hooks/useTags";
import { urlValidate } from "src/utils/varidate";
import { mutate } from "swr";
import { MemoForm } from "src/components/NewForm/MemoForm";

const createPost = async (value) => {
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  };

  const res = await fetch("/api/posts/createPost", params);
  const json = await res.json();
  console.log(json);
  return json;
};

export const NewForm = () => {
  const router = useRouter();
  const { data: folders } = useFolders();
  const { data: tags } = useTags();
  const [tagsSelectData, setTagsSelectData] = useState([]);
  const foldersSerectData = folders
    ? folders.map((folder) => ({ value: folder.id, label: folder.name }))
    : [];

  const form = useForm({
    initialValues: {
      folder_id: "",
      url: "",
      name: "",
      tags: [],
    },
    validate: {
      url: (value) => (urlValidate(value) ? "URLを入力してください" : null),
    },
  });

  const newTag = (query) => {
    return `+ New Tag ${query}`;
  };

  const handleOnCreate = (query) => {
    setTagsSelectData((prev) => [...prev, query]);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    await createPost(values);
    form.validate();
    form.errors;
    form.reset();
    mutate("/api/folders/findAllFolder");
    mutate("/api/findAllTag");
  };

  useEffect(() => {
    if (router.query.folderId) {
      form.setFieldValue("folder_id", router.query.folderId);
    }
  }, [router.query.folderId]);

  useEffect(() => {
    const tagsNameArray = tags ? tags.map((tag) => tag.name) : [];
    setTagsSelectData(tagsNameArray);
  }, [tags]);

  return (
    <div className="w-full flex flex-col items-center">
      <Tabs
        className="w-3/4 mt-8 "
        grow
        position="center"
        initialTab={router.query?.tabKey ? 1 : 0}
      >
        <Tabs.Tab className="font-bold" label="Url" tabKey="First">
          <form
            className="w-3/4 mx-auto mt-8 flex flex-col gap-3"
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <Select
              label="FOLDER"
              placeholder={
                router.query.folderName ? router.query.folderName : "folder"
              }
              data={foldersSerectData}
              disabled={router.query.folderId ? true : false}
              required
              searchable
              clearable
              nothingFound="No Folder"
              {...form.getInputProps("folder_id")}
            />
            <TextInput
              placeholder="url"
              label="URL"
              required
              {...form.getInputProps("url")}
            />
            <TextInput
              placeholder="name"
              label="NAME"
              required
              {...form.getInputProps("name")}
            />
            <MultiSelect
              data={tagsSelectData}
              label="TAG"
              placeholder="tag"
              icon={<BsHash />}
              searchable
              creatable
              clearable
              nothingFound="Nothing found"
              getCreateLabel={newTag}
              onCreate={handleOnCreate}
              {...form.getInputProps("tags")}
            />
            <Button className="bg-gray-500" type="submit">
              Submit
            </Button>
          </form>
        </Tabs.Tab>
        <Tabs.Tab className="font-bold" label="Memo" tabKey="Second">
          <MemoForm />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};
