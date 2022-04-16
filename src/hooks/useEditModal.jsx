import { Button, Loader, Modal, MultiSelect, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import React, { useState, useCallback, useEffect } from "react";
import { notifications } from "src/utils/notification";
import { useSWRConfig } from "swr";
import { useTags } from "./useTags";

const tagsArray = (tags) => {
  console.log(tags);
  const results = tags.map((tag) => tag.name);
  return results;
};

export const useEditModal = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data: tags } = useTags();
  const [tagsSelectData, setTagsSelectData] = useState([]);
  const [post, setPost] = useState("");
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);

  const editForm = useForm({
    initialValues: {
      post: "",
      name: "",
      tags: [],
    },
  });

  const newTagLabel = useCallback((query) => {
    return `+ New Tag ${query}`;
  }, []);

  const handleCreateTag = useCallback((query) => {
    setTagsSelectData((prev) => [...prev, query]);
  }, []);

  const handleSubmit = useCallback(
    async (value) => {
      try {
        setIsEditLoading(true);
        const prevTags = value.post.tags.map((tag) => tag.name);
        const newTags = value.tags;

        const updateTags = newTags.filter(
          (newTag) => !prevTags.includes(newTag)
        );
        const deleteTags = prevTags.filter(
          (prevTag) => !newTags.includes(prevTag)
        );

        const bodyParams = {
          post_id: value.post.id,
          name: value.name,
          updateTags,
          deleteTags,
        };

        const params = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyParams),
        };

        const res = await fetch("/api/posts/updatePost", params);

        if (!res.ok) {
          throw new Error(`code:${res.status} ${res.statusText}`);
        }

        await mutate("/api/tags/findAllTag");

        if (router.pathname === "/posts/[id]") {
          await mutate(`/api/posts/findPost?folder_id=${router.query.id}`);
        }
        if (router.pathname === "/tags/[id]") {
          await mutate(`/api/posts/findPost?tag_id=${router.query.id}`);
        }
      } catch (error) {
        notifications("削除時にエラーが発生しました。", error.message);
      } finally {
        setIsEditLoading(false);
        setIsEditModalOpened(false);
      }
    },
    [router]
  );

  useEffect(() => {
    if (tags) {
      setTagsSelectData(tags ? tagsArray(tags) : []);
    }
  }, [tags]);

  useEffect(() => {
    if (post) {
      editForm.setValues({
        post,
        name: post.name,
        tags: tagsArray(post.tags),
      });
    }
  }, [post]);

  return {
    setPost,
    setIsEditModalOpened,
    editModal: (
      <Modal
        classNames={{
          header: "mb-0",
          modal: "dark:bg-neutral-800",
          title: "dark:text-gray-400",
        }}
        opened={isEditModalOpened}
        onClose={() => setIsEditModalOpened(isEditLoading ? true : false)}
        title="Edit Page"
        centered
      >
        <p className="mb-2 text-xs text-gray-500  ">
          *タイトルとタグの編集ができます。
        </p>
        <form
          className="flex flex-col gap-3"
          onSubmit={editForm.onSubmit(handleSubmit)}
        >
          <TextInput
            classNames={{
              defaultVariant: "dark:bg-neutral-700 dark:border-neutral-700 ",
              input: "dark:text-gray-300",
              label: "dark:text-gray-300",
            }}
            label="Name"
            {...editForm.getInputProps("name")}
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
            label="Tags"
            placeholder="Pick all that you like"
            searchable
            nothingFound
            clearable
            creatable
            onCreate={handleCreateTag}
            getCreateLabel={newTagLabel}
            {...editForm.getInputProps("tags")}
          />
          {isEditLoading ? (
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
