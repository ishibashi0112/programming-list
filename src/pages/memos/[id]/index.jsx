import React from "react";
import { Memo as MemoComponent } from "src/components/Memo";
import Layout from "src/layout";
import { getSession } from "next-auth/react";
import { AuthCheak } from "src/components/AuthCheak";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};

const Memo = () => {
  return (
    <AuthCheak>
      <div className="w-full h-full md:w-[calc(100%-230px)] md:ml-auto lg:w-4/5">
        <MemoComponent />
      </div>
    </AuthCheak>
  );
};

export default Memo;

Memo.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
