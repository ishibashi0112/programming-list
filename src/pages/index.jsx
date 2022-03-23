import React from "react";
import { Folder } from "src/components/Folder";
import { Header } from "src/components/Header";
import { NewForm } from "src/components/NewForm";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Folder />
        <NewForm />
      </div>
    </div>
  );
};

export default Home;
