import Link from "next/link";
import React, { useEffect, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
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

  if (router.pathname !== "/auth/signin") {
    return (
      <header className="flex fixed top-0 z-40 justify-between items-center px-4 w-full h-12 bg-white dark:bg-neutral-900 border-b border-black">
        <Link href="/">
          <a>
            <h1 className="ml-6 text-2xl font-bold dark:text-gray-50 md:ml-0">
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
              className="flex justify-between items-center mr-5 w-64 h-9  text-gray-500 dark:bg-neutral-700 rounded-md border dark:border-black hover:opacity-70 transition  hover:transition"
              onClick={handleClickSeacrh}
            >
              <div className="flex items-center">
                <p className="p-1">
                  <BiSearch />
                </p>
                <p>Search</p>
              </div>

              <div className="flex mr-2 h-2/3  ">
                <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
              </div>
            </button>
          </div>

          <ActionIcon
            className="mr-5 dark:hover:bg-neutral-700 border border-sky-900 dark:border-yellow-300"
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
              <p className="text-xs   text-gray-500">Name</p>
              <p className="text-sm dark:text-gray-400">{session?.user.name}</p>
              <p className="text-xs text-gray-500">Email</p>
              <p className="w-44 dark:text-gray-400 break-words">
                {session?.user.email}
              </p>
            </MenuItem>
            <Divider className="dark:border-neutral-600" />

            <Menu.Item
              className="hover:bg-red-50 dark:hover:bg-neutral-700 transition hover:transition"
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
    <header className="flex fixed top-0 z-40 items-center px-4 w-full h-12 bg-white dark:bg-neutral-900 border-b border-black">
      <h1 className="text-2xl font-bold dark:text-gray-50">PRG List</h1>
    </header>
  );
};
