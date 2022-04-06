import React from "react";
import { Memo as MemoComponent } from "src/components/Memo";
import Layout from "src/layout";

const Memo = () => {
  return (
    <div className="w-full h-full md:w-[calc(100%-230px)] md:ml-auto lg:w-4/5">
      <MemoComponent />
    </div>
  );
};

export default Memo;

Memo.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
