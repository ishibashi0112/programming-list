import {
  TextInput,
  MultiSelect,
  Select,
  Button,
  Loader,
  Overlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";
import { BsHash } from "react-icons/bs";
import { useFolders } from "src/hooks/useFolders";
import { useTags } from "src/hooks/useTags";
import { urlValidate } from "src/utils/varidate";
import { mutate } from "swr";
import { notifications } from "src/utils/notification";

const createPost = async (value) => {
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  };

  const res = await fetch("/api/posts/createPost", params);

  if (!res.ok) {
    return new Error(`code:${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  return json;
};

export const UrlForm = () => {
  const router = useRouter();
  const { data: folders } = useFolders();
  const { data: tags } = useTags();
  const [tagsSelectData, setTagsSelectData] = useState([]);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isGetTitleAndImageLoading, setIsGetTitleAndImageLoading] =
    useState(false);
  const foldersSerectData = folders
    ? folders.map((folder) => ({ value: folder.id, label: folder.name }))
    : [];

  const urlForm = useForm({
    initialValues: {
      folder_id: "",
      url: "",
      name: "",
      image_url: "",
      tags: [],
    },
    validate: {
      url: (value) => (urlValidate(value) ? "URLを入力してください" : null),
    },
  });

  const newTagLabel = useCallback((query) => {
    return `+ New Tag ${query}`;
  }, []);

  const handleOnCreate = useCallback((query) => {
    setTagsSelectData((prev) => [...prev, query]);
  }, []);

  const handleSubmit = useCallback(
    async (values) => {
      try {
        console.log(values);
        setIsSubmitLoading(true);
        const newPost = await createPost(values);
        console.log(newPost);

        if (newPost instanceof Error) {
          throw newPost;
        }

        await mutate("/api/folders/findAllFolder");
        await mutate("/api/tags/findAllTag");
        urlForm.reset();
      } catch (error) {
        notifications("Url保存時にエラーが発生しました。", error.message);
      } finally {
        setIsSubmitLoading(false);
      }
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

  const handleGetTitleAndImage = useCallback(async () => {
    try {
      setIsGetTitleAndImageLoading(true);
      const url = urlForm.values.url;

      // const res = await fetch(`http://127.0.0.1:8000?url=${url}`, {
      //   mode: "cors",
      // });
      const res = await fetch(`https://wjlr53.deta.dev?url=${url}`, {
        mode: "cors",
      });

      if (!res.ok) {
        throw new Error(`code:${res.status} ${res.statusText}`);
      }

      const json = await res.json();

      urlForm.setFieldValue("name", json.title);
      urlForm.setFieldValue("image_url", json.image);
    } catch (error) {
      notifications("titleの読み込みでエラーが発生しました。", error.message);
    } finally {
      setIsGetTitleAndImageLoading(false);
    }
  }, [urlForm]);

  return (
    <form
      className="flex flex-col gap-3 my-8 mx-auto w-3/4"
      onSubmit={urlForm.onSubmit(handleSubmit)}
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
        classNames={{
          defaultVariant: "dark:bg-neutral-700 dark:border-neutral-700 ",
          input: " dark:text-gray-300 pr-20",
          rightSection: "w-20",
          label: "dark:text-gray-300",
        }}
        placeholder="url"
        label="URL"
        required
        rightSection={
          isGetTitleAndImageLoading ? (
            <Loader color="gray" size={"xs"} />
          ) : (
            <Button
              className="dark:hover:bg-neutral-600"
              variant="subtle"
              compact
              onClick={handleGetTitleAndImage}
            >
              title補完
            </Button>
          )
        }
        {...urlForm.getInputProps("url")}
      />

      {isGetTitleAndImageLoading && (
        <Overlay opacity={0} color="#000" zIndex={70} />
      )}

      <TextInput
        classNames={{
          defaultVariant: "dark:bg-neutral-700 dark:border-neutral-700 ",
          input: "dark:text-gray-300",
          label: "dark:text-gray-300",
        }}
        placeholder="name"
        label="NAME"
        required
        {...urlForm.getInputProps("name")}
      />
      <MultiSelect
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
        data={tagsSelectData}
        label="TAG"
        placeholder="tag"
        icon={<BsHash />}
        searchable
        creatable
        clearable
        nothingFound="Nothing found"
        getCreateLabel={newTagLabel}
        onCreate={handleOnCreate}
        {...urlForm.getInputProps("tags")}
      />

      <input type="hidden" {...urlForm.getInputProps("image")} />

      {isSubmitLoading ? (
        <div className="flex justify-center mt-4">
          <Loader color="gray" variant="dots" />
        </div>
      ) : (
        <Button className="bg-blue-400 " type="submit">
          Submit
        </Button>
      )}
    </form>
  );
};
