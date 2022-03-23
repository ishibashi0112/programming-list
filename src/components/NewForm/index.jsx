import { TextInput, MultiSelect, Select, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { BsHash } from "react-icons/bs";
import { useFolders } from "src/hooks/useFolders";

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

const createTag = async (value, post_id) => {
  const data = { tags: value.tags, post_id };
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch("/api/createTag", params);
  const json = await res.json();
  console.log(json);
};

export const NewForm = () => {
  const { data: folders } = useFolders();
  const folderData = folders
    ? folders.map((folder) => ({ value: folder.id, label: folder.name }))
    : [];
  const [tagData, setTagData] = useState(["React", "Angular", "Svelte", "Vue"]);

  const form = useForm({ initialValues: {} });

  const newTag = (query) => {
    return `+ New Tag ${query}`;
  };

  const handleOnCreate = (query) => {
    setTagData((current) => [...current, query]);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const { tags, ...postValue } = values;
    const { folder_id, url, name, ...tagsValue } = values;

    const res = await createPost(postValue);
    await createTag(tagsValue, res.id);
    console.log("kokomade");
    form.reset();
  };

  return (
    <div className="w-4/5">
      <form
        className="w-2/3 mx-auto mt-10 flex flex-col gap-3"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <Select
          label="FOLDER"
          placeholder="folder"
          data={folderData}
          searchable
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
          data={tagData}
          label="TAG"
          placeholder="tag"
          icon={<BsHash />}
          searchable
          nothingFound="Nothing found"
          creatable
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
