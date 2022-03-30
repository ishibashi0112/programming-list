import React from "react";
import { Posts as PostComponent } from "src/components/Posts";
import Layout from "src/layout";

const Post = () => {
  return (
    <div className="w-4/5">
      <PostComponent />
    </div>
  );
};

export default Post;

Post.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
