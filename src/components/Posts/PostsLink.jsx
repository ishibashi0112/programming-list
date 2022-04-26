import Link from "next/link";
import React, { useCallback } from "react";
import { TagsLink } from "src/components/Tag/TagsLink";
import Image from "next/image";
import { Menu } from "@mantine/core";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDeleteFetchModal } from "src/hooks/useDeleteFetchModal";
import { useRouter } from "next/router";
import { BsFolderSymlink } from "react-icons/bs";
import { useMoveFolderModal } from "src/hooks/useMoveFolderModal";
import { useEditModal } from "src/hooks/useEditModal";

export const PostsLink = (props) => {
  const router = useRouter();

  const {
    deleteModal,
    setDeleteModalData,
    setIsModalOpened: setIsDeleteModalOpened,
  } = useDeleteFetchModal();

  const { moveFolderModal, setPost, setIsMoveFolderModalOpened } =
    useMoveFolderModal();

  const {
    editModal,
    setPost: setEditPost,
    setIsEditModalOpened,
  } = useEditModal();

  const handleClickMoveFolder = useCallback((post) => {
    setPost(post);
    setIsMoveFolderModalOpened(true);
  }, []);

  const handleClickEdit = useCallback((post) => {
    setEditPost(post);
    setIsEditModalOpened(true);
  }, []);

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

  return (
    <ul className="flex flex-wrap gap-4 justify-center p-5 dark:bg-neutral-900 dark:rounded-b-lg ">
      {props.posts.map((post) => (
        <li
          className="relative  w-64 h-64 dark:bg-neutral-700 rounded-md border dark:border-0 shadow hover:opacity-80 transition hover:transition "
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
              icon={<BsFolderSymlink />}
              onClick={() => handleClickMoveFolder(post)}
            >
              folder
            </Menu.Item>

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
              className="group block "
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="relative flex-1  h-36 ">
                {/* <Image
                  className=" rounded-t-md"
                  src={post.image_url ? post.image_url : "/images/noImage.png"}
                  alt="Picture of the author"
                  layout="fill"
                /> */}
                <img
                  alt=""
                  src={post.image_url ? post.image_url : "/images/noImage.png"}
                ></img>
              </p>

              <p className="overflow-hidden px-1 h-[84px] text-lg font-bold dark:text-gray-400">
                {post.name}
              </p>
            </a>
          </Link>

          <TagsLink post={post} />
        </li>
      ))}

      {moveFolderModal}

      {editModal}

      {deleteModal}
    </ul>
  );
};
