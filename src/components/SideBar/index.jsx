import { Accordion, Burger, Drawer } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { UrlItem } from "src/components/SideBar/UrlItem";
import { MemoItem } from "src/components/SideBar/MemoItem";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { useRouter } from "next/router";

export const SideBar = () => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    setOpened(false);
  }, [router]);

  return (
    <>
      <div className="block md:hidden">
        <Burger
          classNames={{
            root: "fixed top-[10px] left-1 z-50 ",
          }}
          color={"gray"}
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          size="sm"
        />
        <Drawer
          classNames={{
            root: "mt-12",
            overlay: "",
            noOverlay: "your-noOverlay-class",
            drawer: "mt-12 dark:bg-neutral-900",
            header: "hidden",
            title: "your-title-class",
            closeButton: "your-closeButton-class",
          }}
          opened={opened}
          onClose={() => setOpened(false)}
          title="Register"
          padding="xl"
          size="70%"
        >
          <Accordion
            classNames={{
              control: "dark:hover:bg-neutral-700",
              content: "max-h-[70vh] overflow-y-auto ",
              label: "dark:text-gray-400",
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
          <footer className="flex  justify-center items-center h-12 text-sm text-gray-500">
            <p className="flex items-center mr-1">
              <AiOutlineCopyrightCircle />
            </p>
            <p>2022 yuki ishibashi</p>
          </footer>
        </Drawer>
      </div>

      <div className="hidden md:block ">
        <div className="flex fixed top-12 z-40 flex-col justify-between w-[230px] h-[calc(100vh-48px)]  max-h-[calc(100vh-48px)] bg-white dark:bg-neutral-900 border-r border-black lg:w-1/5 ">
          <Accordion
            classNames={{
              control: "dark:hover:bg-neutral-700 ",
              content: "h-[70vh] overflow-y-auto ",
              label: "dark:text-gray-400 ",
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
          <footer className="flex justify-center items-center h-12 text-sm text-gray-500">
            <p className="flex items-center mr-1">
              <AiOutlineCopyrightCircle />
            </p>
            <p>2022 yuki ishibashi</p>
          </footer>
        </div>
      </div>
    </>
  );
};
