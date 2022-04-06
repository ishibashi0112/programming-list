import { Skeleton } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import React, { useState, useEffect } from "react";

export const useCreateSkeletonEl = (quantiy) => {
  const [skeletonEl, setSkeletonEl] = useState([]);

  useEffect(() => {
    if (quantiy) {
      let elements = [];
      for (let i = 0; i < quantiy; i++) {
        elements = [
          ...elements,
          <Skeleton className="h-64 w-64 rounded-md" key={`skeltonEl${i}`} />,
        ];
      }
      setSkeletonEl(elements);
    }
  }, [quantiy]);

  return { skeletonEl };
};
