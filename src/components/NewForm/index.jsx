import { Tabs } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { MemoForm } from "src/components/NewForm/MemoForm";
import { UrlForm } from "src/components/NewForm/UrlForm";

export const NewForm = () => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center">
      <Tabs
        className="w-3/4 mt-8 "
        grow
        position="center"
        initialTab={router.query?.tabKey ? 1 : 0}
      >
        <Tabs.Tab className="font-bold" label="Url" tabKey="First">
          <UrlForm />
        </Tabs.Tab>
        <Tabs.Tab className="font-bold" label="Memo" tabKey="Second">
          <MemoForm />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};
