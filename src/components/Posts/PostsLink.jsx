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
      setIsEditLoading(true);
      console.log(value);
      const prevTags = value.post.tags.map((tag) => tag.name);
      const newTags = value.tags;

      const updateTags = newTags.filter((newTag) => !prevTags.includes(newTag));
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

      await fetch("/api/posts/updatePost", params);
      await mutate("/api/findAllTag");
      if (router.pathname === "/posts/[id]") {
        await mutate(`/api/posts/findPost?folder_id=${router.query.id}`);
      }
      if (router.pathname === "/tags/[id]") {
        await mutate(`/api/posts/findPost?tag_id=${router.query.id}`);
      }

      setIsEditLoading(false);
      setEditModalOpened(false);
    },
    [router]
  );

  useEffect(() => {
    if (tags) {
      setTagsSelectData(tagsArray(tags));
    }
  }, [tags]);

  return (
    <ul className="flex flex-wrap gap-4 ">
      {props.posts.map((post) => (
        <li
          className="relative w-64 h-64 border rounded-md shadow transition hover:transition hover:opacity-80 "
          key={post.id}
        >
          <Menu
            classNames={{
              root: "absolute top-0  right-0  z-10 rounded-full",
              label: "p-1 ",
              item: "p-2",
            }}
            trigger="hover"
            position="bottom"
            placement="end"
            size={"xs"}
            gutter={3}
            withArrow
          >
            <Menu.Label>menu</Menu.Label>
            <Menu.Item
              className="font-bold text-blue-400 hover:bg-sky-50"
              icon={<AiOutlineEdit />}
              onClick={() => handleClickEdit(post)}
            >
              edit
            </Menu.Item>
            <Menu.Item
              className="font-bold text-red-400 hover:bg-red-50"
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
                <p className="font-bold text-lg">{post.name}</p>
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
          overlay: "",
        }}
        opened={editModalOpened}
        onClose={() => setEditModalOpened(isEditLoading ? true : false)}
        title="Edit Page"
        centered
      >
        <p className="text-xs text-gray-500 mb-2">
          *タイトルとタグの編集ができます。
        </p>
        <form
          className="flex flex-col gap-3"
          onSubmit={editForm.onSubmit(handleSubmit)}
        >
          <TextInput label="Name" {...editForm.getInputProps("name")} />
          <MultiSelect
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
