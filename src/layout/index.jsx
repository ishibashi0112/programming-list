import React, { useRef } from "react";

import { Header } from "src/components/Header";
import { RectDrawing } from "src/components/RectDrawing";
import { SideBar } from "src/components/SideBar";

const Layout = ({ children }) => {
  const ref = useRef(null);

  return (
    <div className="relative h-screen" ref={ref}>
      <RectDrawing ref={ref} />

      <Header />
      <div className="overflow-y-auto pt-12 w-full  h-screen dark:bg-black ">
        <SideBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
