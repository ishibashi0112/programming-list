import React from "react";
import dynamic from "next/dynamic";
import { Loader, Skeleton } from "@mantine/core";

export default dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center mt-8 min-h-[300px] ">
      <Skeleton height={300} />
    </div>
  ),
});
