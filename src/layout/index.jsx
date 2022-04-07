import React from "react";
import { Header } from "src/components/Header";
import { SideBar } from "src/components/SideBar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <div className="overflow-y-auto pt-12 w-full  h-screen dark:bg-black ">
        <SideBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
