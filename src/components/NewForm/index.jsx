import { Tabs } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { MemoForm } from "src/components/NewForm/MemoForm";
import { UrlForm } from "src/components/NewForm/UrlForm";

export const NewForm = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center w-full  ">
      <Tabs
        classNames={{
          root: "w-5/6 mt-8  dark:bg-neutral-900 dark:rounded-xl dark:text-gray-400 ",
          tabInner: "dark:text-gray-400 ",
          tabActive: "dark:bg-neutral-800 dark:rounded-t-md",
        }}
        grow
        position="center"
        initialTab={router.query?.tabKey ? 1 : 0}
      >
        <Tabs.Tab className="font-bold " label="Url" tabKey="First">
          <UrlForm />
        </Tabs.Tab>
        <Tabs.Tab className="font-bold " label="Memo" tabKey="Second">
          <MemoForm />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};
