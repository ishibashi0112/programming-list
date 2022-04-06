import React from "react";
import { Header } from "src/components/Header";
import { SideBar } from "src/components/SideBar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <div className="w-full h-screen pt-12  dark:bg-black overflow-y-auto ">
        <SideBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
