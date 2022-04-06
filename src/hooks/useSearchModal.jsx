import React, { useState } from "react";
import { Search } from "src/components/Search";
import { Modal } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";

export const useSearchModal = () => {
  const [isSearchModalOpened, setIsSearchModalOpened] = useState(false);
  useHotkeys([["mod+K", () => setIsSearchModalOpened(true)]]);

  return {
    setIsSearchModalOpened,
    searchModal: (
      <Modal
        classNames={{
          root: "sm:w-[70%] mx-auto",
          inner: "your-inner-class",
          modal: "h-[600px] overflow-y-auto relative dark:bg-neutral-800",
          header: "",
          overlay: "your-overlay-class",
          body: "your-body-class",
          close: "absolute top-2 right-2",
        }}
        size={"100%"}
        opened={isSearchModalOpened}
        onClose={() => setIsSearchModalOpened(false)}
      >
        <Search />
      </Modal>
    ),
  };
};
