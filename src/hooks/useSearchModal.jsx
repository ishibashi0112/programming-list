import React, { useCallback, useState } from "react";
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
          root: "your-root-class",
          inner: "your-inner-class",
          modal: "h-[500px] overflow-y-auto relative",
          header: "justify-center",
          overlay: "your-overlay-class",
          title: "",
          body: "your-body-class",
          close: "absolute top-2 right-2",
        }}
        title={"Search"}
        size={"70%"}
        opened={isSearchModalOpened}
        onClose={() => setIsSearchModalOpened(false)}
      >
        <Search />
      </Modal>
    ),
  };
};
