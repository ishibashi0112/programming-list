import React from "react";
import { Header } from "src/components/Header";
import { Folder } from "src/components/Folder";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Folder />
        {children}
      </div>
    </div>
  );
};

export default Layout;
