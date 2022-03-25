import React from "react";
import { Folder } from "src/components/Folder";
import { Header } from "src/components/Header";
import { Post as PostComponent } from "src/components/Post";

const Post = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Folder />
        <PostComponent />
      </div>
    </div>
  );
};

export default Post;
