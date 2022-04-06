import Link from "next/link";
import React, { useEffect, useCallback, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  Kbd,
  Menu,
  MenuItem,
} from "@mantine/core";
import { VscSignOut } from "react-icons/vsc";
import { useRouter } from "next/router";
import { BiSearch } from "react-icons/bi";
import { useSearchModal } from "src/hooks/useSearchModal";
import { useLocalStorage } from "@mantine/hooks";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";

export const Header = () => {
  const router = useRouter();
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "color-scheme",
    defaultValue: "light",
  });
  const { data: session } = useSession();
  const { setIsSearchModalOpened, searchModal } = useSearchModal();

  const handleClickSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" });
  };

  const handleClickSeacrh = useCallback(() => {
    setIsSearchModalOpened(true);
  }, []);

  const handleChangeColorScheme = useCallback(() => {
    setColorScheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  useEffect(() => {
    if (colorScheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [colorScheme]);

  if (session) {
    return (
      <header className="fixed top-0 z-40 w-full h-12 flex items-center justify-between px-4 border-b border-black bg-white dark:bg-neutral-900">
        <Link href="/">
          <a>
            <h1 className="text-2xl font-bold ml-6 md:ml-0 dark:text-gray-50">
              PRG List
            </h1>
          </a>
        </Link>

        <div className="flex items-center">
          <div className="sm:hidden">
            <Button
              className="mr-3 "
              variant="subtle"
              color="gray"
              radius={9999}
              size="md"
              compact
              onClick={handleClickSeacrh}
            >
              <p className="flex items-center">
                <BiSearch className="text-2xl" />
              </p>
            </Button>
          </div>

          <div className="hidden sm:block">
            <button
              className="flex justify-between items-center h-9 w-64 mr-5  border rounded-md text-gray-500 transition hover:transition hover:opacity-70 dark:border-black  dark:bg-neutral-700"
              onClick={handleClickSeacrh}
            >
              <div className="flex items-center">
                <p className="p-1">
                  <BiSearch />
                </p>
                <p>Search</p>
              </div>

              <div className="flex h-2/3 mr-2  ">
                <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
              </div>
            </button>
          </div>

          <ActionIcon
            className="mr-5 border border-sky-900 dark:border-yellow-300 dark:hover:bg-neutral-700"
            size="lg"
            onClick={handleChangeColorScheme}
          >
            {colorScheme === "dark" ? (
              <MdOutlineLightMode className="text-xl text-yellow-300 hover:bg-neutral-700" />
            ) : (
              <MdOutlineNightlight className="text-xl text-sky-900" />
            )}
          </ActionIcon>

          <Menu
            classNames={{
              root: "your-root-class",
              label: "px-1 py-0 ",
              item: "",
              body: "dark:bg-neutral-800 dark:border-black",
              itemHovered: "your-itemHovered-class",
              itemInner: "your-itemInner-class",
              itemBody: "your-itemBody-class",
              itemIcon: "your-itemIcon-class",
              itemLabel: "",
              arrow: "your-arrow-class",
            }}
            control={<Avatar src={session?.user.image} radius="xl" />}
          >
            <Menu.Label>User Data</Menu.Label>
            <MenuItem>
              <p className="text-gray-500   text-xs">Name</p>
              <p className="text-sm dark:text-gray-400">{session?.user.name}</p>
              <p className="text-gray-500 text-xs">Email</p>
              <p className="w-44 break-words dark:text-gray-400">
                {session?.user.email}
              </p>
            </MenuItem>
            <Divider className="dark:border-neutral-600" />

            <Menu.Item
              className="transition hover:transition hover:bg-red-50 dark:hover:bg-neutral-700"
              icon={<VscSignOut />}
              color={"red"}
              onClick={handleClickSignOut}
            >
              Sign Out
            </Menu.Item>
          </Menu>
        </div>

        {searchModal}
      </header>
    );
  }

  return (
    <header className="fixed top-0 z-40 w-full h-12 flex items-center justify-center px-4 border-b border-black bg-white">
      <h1 className="text-2xl font-bold">Prgramming List</h1>
    </header>
  );
};
