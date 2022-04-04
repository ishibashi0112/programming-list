import { Accordion } from "@mantine/core";
import React from "react";
import { UrlItem } from "src/components/SideBar/UrlItem";
import { MemoItem } from "src/components/SideBar/MemoItem";

export const SideBar = () => {
  return (
    <div className="max-h-[calc(100vh-48px)]  w-1/5 border-r border-black">
      <Accordion
        classNames={{
          content: "h-[70vh] overflow-y-auto",
        }}
        iconSize={18}
        initialItem={0}
        iconPosition="right"
      >
        <Accordion.Item label="URL">
          <UrlItem />
        </Accordion.Item>

        <Accordion.Item label="Memo">
          <MemoItem />
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
