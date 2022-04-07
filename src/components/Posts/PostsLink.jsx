import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { TagsLink } from "src/components/Tag/TagsLink";
import Image from "next/image";
import {
  Button,
  Loader,
  Menu,
  Modal,
  MultiSelect,
  TextInput,
} from "@mantine/core";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useForm } from "@mantine/form";
import { useTags } from "src/hooks/useTags";
import { useDeleteFetchModal } from "src/hooks/useDeleteFetchModal";
import { mutate } from "swr";
import { useRouter } from "next/router";

const tagsArray = (tags) => {
  const results = tags.map((tag) => tag.name);
  return results;
};

export const PostsLink = (props) => {
  const router = useRouter();
  console.log(router.query.id);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const { data: tags } = useTags();
  console.log();
  const [tagsSelectData, setTagsSelectData] = useState([]);
  const {
    deleteModal,
    setDeleteModalData,
    setIsModalOpened: setIsDeleteModalOpened,
  } = useDeleteFetchModal();
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

  const handleClickEdit = useCallback(
    (post) => {
      editForm.setValues({
        post,
        name: post.name,
        tags: tagsArray(post.tags),
      });
      setEditModalOpened(true);
    },
    [editForm]
  );

  const handleClickRemove = useCallback(
    (post) => {
      setDeleteModalData({
        apiUrl: "/api/posts/deletePost",
        mutateUrls: [
          "/api/folders/findAllFolder",
          router.pathname === "/posts/[id]"
            ? `/api/posts/findPost?folder_id=${router.query.id}`
            : `/api/posts/findPost?tag_id=${router.query.id}`,
        ],
        fetchData: post,
        titleValue: post.name,
      });
      setIsDeleteModalOpened(true);
    },
    [router]
  );

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
        setEditModalOpened(false);
      }
    },
    [router]
  );

  useEffect(() => {
    if (tags) {
      setTagsSelectData(tagsArray(tags));
    }
  }, [tags]);

  return (
    <ul className="flex flex-wrap justify-center gap-4 p-5 dark:bg-neutral-900 dark:rounded-b-lg ">
      {props.posts.map((post) => (
        <li
          className="relative  w-64 h-64 border rounded-md shadow transition hover:transition hover:opacity-80 dark:border-black "
          key={post.id}
        >
          <Menu
            classNames={{
              root: "absolute top-0  right-0  z-10 rounded-full ",
              label: "p-1 ",
              item: "p-2",
              body: "dark:bg-neutral-800 dark:border-black",
            }}
            position="bottom"
            placement="end"
            size={"xs"}
            gutter={3}
          >
            <Menu.Label>menu</Menu.Label>
            <Menu.Item
              className="font-bold text-blue-400 hover:bg-sky-50 dark:hover:bg-neutral-700"
              icon={<AiOutlineEdit />}
              onClick={() => handleClickEdit(post)}
            >
              edit
            </Menu.Item>
            <Menu.Item
              className="font-bold text-red-400 hover:bg-red-50 dark:hover:bg-neutral-700"
              icon={<AiOutlineDelete />}
              onClick={() => handleClickRemove(post)}
            >
              remove
            </Menu.Item>
          </Menu>

          <Link href={post.url}>
            <a
              className="block group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="flex-1 h-36  relative ">
                <Image
                  className=" rounded-t-md"
                  src={"/images/noImage.png"}
                  alt="Picture of the author"
                  layout="fill"
                />
              </p>
              <div className=" p-1">
                <p className="font-bold text-lg dark:text-gray-400">
                  {post.name}
                </p>
                <p className="text-sm text-gray-500 transition group-hover:transition group-hover:text-blue-400 truncate">
                  {post.url}
                </p>
              </div>
            </a>
          </Link>

          <TagsLink post={post} />
        </li>
      ))}

      {deleteModal}
      <Modal
        classNames={{
          header: "mb-0",
          modal: "dark:bg-neutral-800",
          title: "dark:text-gray-400",
        }}
        opened={editModalOpened}
        onClose={() => setEditModalOpened(isEditLoading ? true : false)}
        title="Edit Page"
        centered
      >
        <p className="text-xs text-gray-500 mb-2  ">
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
    </ul>
  );
};
