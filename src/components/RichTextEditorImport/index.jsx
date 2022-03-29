import React from "react";
import dynamic from "next/dynamic";
import { Loader } from "@mantine/core";

export default dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center min-h-[300px]">
      <Loader />
    </div>
  ),
});
