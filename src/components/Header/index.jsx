import Link from "next/link";
import React from "react";

import { Search } from "src/components/Search";

export const Header = () => {
  return (
    <header className="flex items-center justify-between h-12 px-4 border-b border-black ">
      <Link href="/">
        <a>
          <h1 className="text-2xl font-bold">Prgramming List</h1>
        </a>
      </Link>
      <Search />
    </header>
  );
};
