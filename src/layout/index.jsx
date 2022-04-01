import React from "react";
import { Header } from "src/components/Header";
import { SideBar } from "src/components/SideBar";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="flex">
        <SideBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
