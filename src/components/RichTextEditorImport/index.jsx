import React from "react";
import dynamic from "next/dynamic";
import { Loader, Skeleton } from "@mantine/core";

export default dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center min-h-[300px] mt-8 ">
      <Skeleton height={300} />
    </div>
  ),
});
