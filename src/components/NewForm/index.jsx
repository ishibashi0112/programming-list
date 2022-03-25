import { TextInput, MultiSelect, Select, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { BsHash } from "react-icons/bs";
import { useFolders } from "src/hooks/useFolders";
import { useTags } from "src/hooks/useTags";
import { urlValidate } from "src/utils/varidate";
import { mutate } from "swr";

const createPost = async (value) => {
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  };

  const res = await fetch("/api/createPost", params);
  const json = await res.json();
  console.log(json);
  return json;
};

export const NewForm = () => {
  const { data: folders } = useFolders();
  const { data: tags } = useTags();

  const form = useForm({
    initialValues: { folder_id: "", url: "", name: "", tags: [] },
    validate: {
      url: (value) => (urlValidate(value) ? "URLを入力してください" : null),
    },
  });

  const foldersSerectData = folders
    ? folders.map((folder) => ({ value: folder.id, label: folder.name }))
    : [];

  const tagsSerectData = tags ? tags.map((tag) => tag.name) : [];

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

  return (
    <div className="w-4/5">
      <form
        className="w-2/3 mx-auto mt-10 flex flex-col gap-3"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <Select
          allowDeselect
          label="FOLDER"
          placeholder="folder"
          data={foldersSerectData}
          required
          searchable
          clearable
          nothingFound="No Folder"
          {...form.getInputProps("folder_id")}
        />
        <TextInput
          placeholder="url"
          label="URL"
          clearable
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
          data={tagsSerectData}
          label="TAG"
          placeholder="tag"
          icon={<BsHash />}
          searchable
          nothingFound="Nothing found"
          getCreateLabel={newTag}
          onCreate={handleOnCreate}
          {...form.getInputProps("tags")}
        />
        <Button className="bg-gray-500" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
