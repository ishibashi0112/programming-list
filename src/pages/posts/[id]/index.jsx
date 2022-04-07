import { getSession } from "next-auth/react";
import React from "react";
import { AuthCheak } from "src/components/AuthCheak";
import { Posts as PostComponent } from "src/components/Posts";
import Layout from "src/layout";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};

const Post = () => {
  return (
    <AuthCheak>
      <div className="w-full md:w-[calc(100%-230px)] md:ml-auto lg:w-4/5">
        <PostComponent />
      </div>
    </AuthCheak>
  );
};

export default Post;

Post.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
