import {
  TextInput,
  MultiSelect,
  Select,
  Button,
  Tabs,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback, useMemo } from "react";
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

  const res = await fetch("/api/posts/createPost", params);
  const json = await res.json();
  console.log(json);
  return json;
};

export const UrlForm = () => {
  const router = useRouter();
  const { data: folders } = useFolders();
  const { data: tags } = useTags();
  const [tagsSelectData, setTagsSelectData] = useState([]);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const foldersSerectData = folders
    ? folders.map((folder) => ({ value: folder.id, label: folder.name }))
    : [];

  const urlForm = useForm({
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

  const newTag = useCallback((query) => {
    return `+ New Tag ${query}`;
  }, []);

  const handleOnCreate = useCallback((query) => {
    setTagsSelectData((prev) => [...prev, query]);
  }, []);

  const handleSubmit = useCallback(
    async (values) => {
      setIsSubmitLoading(true);
      const newPost = await createPost(values);
      console.log(newPost.folder_id);
      await mutate("/api/folders/findAllFolder");
      await mutate("/api/findAllTag");
      // await mutate(`/api/posts/findPost?folder_id=${newPost.folder_id}`);
      urlForm.reset();
      setIsSubmitLoading(false);
    },
    [urlForm]
  );

  useEffect(() => {
    if (router.query.folderId) {
      urlForm.setFieldValue("folder_id", router.query.folderId);
    }
  }, [router.query.folderId]);

  useEffect(() => {
    const tagsNameArray = tags ? tags.map((tag) => tag.name) : [];
    setTagsSelectData(tagsNameArray);
  }, [tags]);

  return (
    <form
      className="w-3/4 mx-auto mt-8 flex flex-col gap-3"
      onSubmit={urlForm.onSubmit(handleSubmit)}
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
        clearable={router.query.folderId ? false : true}
        nothingFound="No Folder"
        {...urlForm.getInputProps("folder_id")}
      />
      <TextInput
        placeholder="url"
        label="URL"
        required
        {...urlForm.getInputProps("url")}
      />
      <TextInput
        placeholder="name"
        label="NAME"
        required
        {...urlForm.getInputProps("name")}
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
        {...urlForm.getInputProps("tags")}
      />
      {isSubmitLoading ? (
        <div className="flex justify-center mt-4">
          <Loader color="gray" variant="dots" />
        </div>
      ) : (
        <Button className="bg-gray-500" type="submit">
          Submit
        </Button>
      )}
    </form>
  );
};
