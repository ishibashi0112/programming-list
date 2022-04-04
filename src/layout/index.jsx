import React from "react";
import { Header } from "src/components/Header";
import { SideBar } from "src/components/SideBar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex h-[calc(100%-48px)]">
        <SideBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
