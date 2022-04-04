import Link from "next/link";
import React, { useEffect, useCallback, useState } from "react";
import { Search } from "src/components/Search";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Avatar,
  Button,
  Divider,
  Kbd,
  Menu,
  MenuItem,
  Modal,
} from "@mantine/core";
import { VscSignOut } from "react-icons/vsc";
import { useRouter } from "next/router";
import { BiSearch } from "react-icons/bi";
import { useSearchModal } from "src/hooks/useSearchModal";

export const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { setIsSearchModalOpened, searchModal } = useSearchModal();

  const handleClickSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" });
  };

  const handleClickSeacrh = useCallback(() => {
    setIsSearchModalOpened(true);
  }, []);

  if (session) {
    return (
      <header className="flex items-center justify-between h-12 px-4 border-b border-black ">
        <Link href="/">
          <a>
            <h1 className="text-2xl font-bold">Prgramming List</h1>
          </a>
        </Link>

        <div className="flex">
          <button
            className="flex justify-between items-center h-9 w-64 mr-5  border rounded-md text-gray-500 transition hover:transition hover:opacity-70"
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

          <Menu control={<Avatar src={session?.user.image} radius="xl" />}>
            <Menu.Label>User Data</Menu.Label>
            <Divider />
            <MenuItem>
              <p className="text-sm">{session?.user.name}</p>
              <p className="truncate">{session?.user.email}</p>
            </MenuItem>
            <Divider />
            <Menu.Item
              className="transition hover:transition  hover:bg-gray-200"
              icon={<VscSignOut />}
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
    <header className="flex items-center justify-center h-12 px-4 border-b border-black ">
      <h1 className="text-2xl font-bold">Prgramming List</h1>
    </header>
  );
};
