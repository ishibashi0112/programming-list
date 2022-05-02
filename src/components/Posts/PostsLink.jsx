import Link from "next/link";
import React, { useCallback } from "react";
import { TagsLink } from "src/components/Tag/TagsLink";
import { FloatingTooltip, Menu, SimpleGrid, Stack } from "@mantine/core";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDeleteFetchModal } from "src/hooks/useDeleteFetchModal";
import { useRouter } from "next/router";
import { BsFolderSymlink } from "react-icons/bs";
import { useMoveFolderModal } from "src/hooks/useMoveFolderModal";
import { useEditModal } from "src/hooks/useEditModal";
import dayjs from "dayjs";

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

  if (props.display.format === "grid") {
    return (
      <ul className="flex  justify-center p-5 dark:bg-neutral-900 dark:rounded-b-lg ">
        <SimpleGrid
          cols={4}
          breakpoints={[
            { maxWidth: 1380, cols: 3, spacing: "md" },
            { maxWidth: 1060, cols: 2, spacing: "sm" },
            { maxWidth: 820, cols: 1, spacing: "sm" },
          ]}
        >
          {props.posts.map((post) => (
            <FloatingTooltip
              classNames={{ body: "max-w-[200px] break-normal" }}
              openDelay={500}
              key={post.id}
              wrapLines
              label={post.name}
            >
              <li className="relative  w-64 h-64 dark:bg-neutral-700 rounded-md border dark:border-0 shadow hover:opacity-80 transition hover:transition ">
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
                      <img
                        className="w-full h-full rounded-t-md"
                        alt="noimage"
                        src={
                          post.image_url
                            ? post.image_url
                            : "/images/noImage.png"
                        }
                      />
                    </p>

                    <p className="overflow-hidden px-1 h-[55px] text-lg font-bold dark:text-gray-400">
                      {post.name}
                    </p>
                    <p className="p-1 text-sm text-gray-500 dark:text-gray-400">
                      {dayjs(post.updatedAt).format(`YYYY年MM月D日 HH:mm`)}
                    </p>
                  </a>
                </Link>

                <TagsLink post={post} />
              </li>
            </FloatingTooltip>
          ))}
        </SimpleGrid>

        {moveFolderModal}

        {editModal}

        {deleteModal}
      </ul>
    );
  }
  if (props.display.format === "list") {
    return (
      <ul className="flex  justify-center p-5 dark:bg-neutral-900 dark:rounded-b-lg ">
        <Stack justify="flex-start" spacing="sm">
          {props.posts.map((post) => (
            <FloatingTooltip
              classNames={{ body: "max-w-[200px] break-normal" }}
              openDelay={500}
              key={post.id}
              wrapLines
              label={post.name}
            >
              <li className="flex relative h-[90px] dark:bg-neutral-700 rounded-md border dark:border-0 shadow hover:opacity-80 transition hover:transition ">
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
                    className="group flex  "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="block w-32 h-full rounded-l-md"
                      alt="noimage"
                      src={
                        post.image_url ? post.image_url : "/images/noImage.png"
                      }
                    />
                    <div className="flex flex-col justify-between py-1">
                      <p className=" px-1 text-lg  font-bold dark:text-gray-400">
                        {post.name}
                      </p>
                      <p className="px-1 text-sm text-gray-500 dark:text-gray-400">
                        {dayjs(post.updatedAt).format(`YYYY年MM月D日 HH:mm`)}
                      </p>

                      <TagsLink post={post} />
                    </div>
                  </a>
                </Link>
              </li>
            </FloatingTooltip>
          ))}
        </Stack>
        {moveFolderModal}

        {editModal}

        {deleteModal}
      </ul>
    );
  }
  return <></>;
};
