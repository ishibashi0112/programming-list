import React from "react";
import { Tag as TagComponent } from "src/components/Tag";
import Layout from "src/layout";

const Tag = () => {
  return (
    <div className="w-4/5">
      <TagComponent />
    </div>
  );
};

export default Tag;

Tag.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
