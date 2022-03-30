import React from "react";
import { NewForm } from "src/components/NewForm";
import Layout from "src/layout";

const Home = () => {
  return (
    <div className="w-4/5">
      <NewForm />
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
