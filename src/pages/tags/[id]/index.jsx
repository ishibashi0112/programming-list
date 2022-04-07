import { getSession } from "next-auth/react";
import React from "react";
import { AuthCheak } from "src/components/AuthCheak";
import { Tag as TagComponent } from "src/components/Tag";
import Layout from "src/layout";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};

const Tag = () => {
  return (
    <AuthCheak>
      <div className="w-full md:w-[calc(100%-230px)] md:ml-auto lg:w-4/5">
        <TagComponent />
      </div>
    </AuthCheak>
  );
};

export default Tag;

Tag.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
