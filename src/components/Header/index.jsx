import Link from "next/link";
import React, { useEffect } from "react";
import { Search } from "src/components/Search";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, Divider, Menu, MenuItem } from "@mantine/core";
import { VscSignOut } from "react-icons/vsc";
import { useRouter } from "next/router";

// const UserButton =

export const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session, status);

  const handleClickSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" });
  };

  if (session) {
    return (
      <header className="flex items-center justify-between h-12 px-4 border-b border-black ">
        <Link href="/">
          <a>
            <h1 className="text-2xl font-bold">Prgramming List</h1>
          </a>
        </Link>
        <Search />

        <Menu control={<Avatar src={session?.user.image} radius="xl" />}>
          <Menu.Label>User Data</Menu.Label>
          <Divider />
          <MenuItem>
            <p className="text-sm">{session?.user.name}</p>
            <p className="truncate">{session?.user.email}</p>
          </MenuItem>
          <Divider />
          <Menu.Item
            className="transition hover:transition hover:bg-gray-200"
            icon={<VscSignOut />}
            onClick={handleClickSignOut}
          >
            Sign Out
          </Menu.Item>
        </Menu>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-center h-12 px-4 border-b border-black ">
      <h1 className="text-2xl font-bold">Prgramming List</h1>
    </header>
  );
};
