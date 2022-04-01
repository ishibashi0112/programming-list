import Link from "next/link";
import React, { useState, useEffect } from "react";
import { TagsLink } from "src/components/Tag/TagsLink";
import Image from "next/image";
import { Button, Menu, Modal, MultiSelect, TextInput } from "@mantine/core";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useForm } from "@mantine/form";
import { useTags } from "src/hooks/useTags";

const tagsArray = (tags) => {
  const results = tags.map((tag) => tag.name);
  return results;
};

export const PostsLink = (props) => {
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [removeModalOpened, setRemoveModalOpened] = useState(false);
  const { data: tags } = useTags();
  const [tagsSelectData, setTagsSelectData] = useState([]);
  const editForm = useForm({
    initialValues: {
      post: "",
      name: "",
      tags: [],
    },
  });

  const newTagLabel = (query) => {
    return `+ New Tag ${query}`;
  };

  const handleCreateTag = (query) => {
    setTagsSelectData((prev) => [...prev, query]);
  };

  const handleClickEdit = (post) => {
    editForm.setValues({
      post,
      name: post.name,
      tags: tagsArray(post.tags),
    });
    setEditModalOpened(true);
  };
  const handleClickRemove = () => {
    setRemoveModalOpened(true);
  };

  const handleDelete = async (post) => {
    const bodyParams = { post };
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyParams),
    };

    await fetch("/api/posts/deletePost", params);
    alert("削除しました");
    setRemoveModalOpened(false);
  };

  const handleSubmit = async (value) => {
    const prevTags = value.post.tags.map((tag) => tag.name);
    const newTags = value.tags;

    const updateTags = newTags.filter((newTag) => !prevTags.includes(newTag));
    const deleteTags = prevTags.filter((prevTag) => !newTags.includes(prevTag));

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
    alert("更新しました");
    setEditModalOpened(false);
  };

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
              onClick={handleClickRemove}
            >
              remove
            </Menu.Item>
          </Menu>

          <Modal
            classNames={{
              header: "mb-0",
              overlay: "opacity-0",
            }}
            opened={editModalOpened}
            onClose={() => setEditModalOpened(false)}
            title="Edit Page"
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
              <Button className="mt-3 op bg-blue-400 " type="submit">
                save
              </Button>
            </form>
          </Modal>

          <Modal
            classNames={{
              root: "your-root-class",
              inner: "your-inner-class",
              modal: "w-60",
              header: "justify-center",
              overlay: "opacity-0",
              title: "justify-center",
              body: "your-body-class",
              close: "your-close-class",
            }}
            opened={removeModalOpened}
            onClose={() => setRemoveModalOpened(false)}
            title="削除しますか？"
            size="xs"
            shadow="xs"
            withCloseButton={false}
          >
            <div className="flex justify-center ">
              <Button
                className="m-1"
                variant="outline"
                onClick={() => handleDelete(post)}
              >
                yes
              </Button>
              <Button
                className="m-1"
                variant="outline"
                onClick={() => setRemoveModalOpened(false)}
              >
                no
              </Button>
            </div>
          </Modal>

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
    </ul>
  );
};
