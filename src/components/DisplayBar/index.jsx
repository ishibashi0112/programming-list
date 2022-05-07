import {
  Badge,
  Button,
  Popover,
  SegmentedControl,
  TextInput,
} from "@mantine/core";
import React, { useState, useCallback, useEffect } from "react";
import { AiOutlineFolder, AiOutlineUnorderedList } from "react-icons/ai";
import { useRouter } from "next/router";
import {
  BsGrid3X3Gap,
  BsHash,
  BsSortNumericDown,
  BsSortNumericUp,
} from "react-icons/bs";
import { useDebouncedValue, useLocalStorage } from "@mantine/hooks";
import { BiFilterAlt } from "react-icons/bi";

export const DisplayBar = (props) => {
  const router = useRouter();

  const [format, setFormat] = useLocalStorage({
    key: "format",
    defaultValue: "grid",
  });
  const [time, setTime] = useLocalStorage({
    key: "time",
    defaultValue: "down",
  });
  console.log(format, time);

  const [searchFilterState, setSearchFilterState] = useState({
    isOpened: false,
    inputValue: "",
  });
  const [isDisplayPopOpened, setIsDisplayPopOpened] = useState(false);

  const [debouncedValue] = useDebouncedValue(
    searchFilterState.inputValue,
    500,
    { leading: false }
  );

  const handleOnChange = useCallback((e) => {
    setSearchFilterState((prev) => ({ ...prev, inputValue: e.target.value }));
  }, []);

  const handleClickFilterCancel = useCallback(() => {
    setSearchFilterState((prev) => ({
      ...prev,
      isOpened: false,
      inputValue: "",
    }));

    if (isDisplayPopOpened) {
      setIsDisplayPopOpened(false);
    }
  }, []);

  useEffect(() => {
    if (!debouncedValue) {
      props.setPosts(props.posts.defaultPosts);
    }
    if (debouncedValue) {
      const filterArray = props.posts.defaultPosts.filter((post) =>
        post.name.includes(debouncedValue)
      );
      props.setPosts(filterArray);
    }
  }, [debouncedValue]);

  return (
    <div className="flex justify-between items-center">
      {router.pathname === "/posts/[id]" ? (
        <h1 className="flex items-center py-1 px-3  text-lg font-bold dark:text-gray-400 dark:bg-neutral-900 dark:rounded-t-lg  ">
          <p className="flex items-center ">
            <AiOutlineFolder />
          </p>
          <p className=" pr-1">{router.query?.folderName}</p>

          <p className="text-lg font-bold">
            {`${props.posts.currentPosts.length}件`}
          </p>
        </h1>
      ) : null}

      {router.pathname === "/tags/[id]" ? (
        <h1 className="flex items-center py-1 px-3 dark:text-gray-400 dark:bg-neutral-900 dark:rounded-t-lg">
          <Badge
            className="mr-1 normal-case	"
            color="gray"
            size="lg"
            leftSection={<BsHash />}
            variant="filled"
          >{`${router.query?.tagName}`}</Badge>
          <p className="text-lg font-bold">
            {`${props.posts.currentPosts.length}件`}
          </p>
        </h1>
      ) : null}

      <div className="hidden sm:block">
        <div className="flex items-center pr-4 ">
          <SegmentedControl
            classNames={{
              root: "mr-2",
              control: "flex items-center",
              label: "px-3 py-[7px]",
            }}
            color="gray"
            data={[
              {
                value: "grid",
                label: <BsGrid3X3Gap />,
              },
              {
                value: "list",
                label: <AiOutlineUnorderedList />,
              },
            ]}
            value={format}
            onChange={(value) => {
              setFormat(value);
            }}
          />

          <SegmentedControl
            classNames={{
              root: "mr-2",
              control: "flex items-center",
              label: "px-3 py-[7px]",
            }}
            color="gray"
            data={[
              {
                value: "down",
                label: <BsSortNumericDown />,
              },
              {
                value: "up",
                label: <BsSortNumericUp />,
              },
            ]}
            value={time}
            onChange={(value) => setTime(value)}
          />

          <Popover
            position="bottom"
            placement="end"
            withArrow
            width={300}
            opened={searchFilterState.isOpened}
            onClose={() =>
              setSearchFilterState((prev) => ({ ...prev, isOpened: false }))
            }
            target={
              <Button
                className={
                  searchFilterState.inputValue
                    ? "bg-blue-200 py-[3px]"
                    : "py-[3px]"
                }
                compact
                variant={searchFilterState.inputValue ? "light" : "outline"}
                size="md"
                color={searchFilterState.inputValue ? "blue" : "dark"}
                onClick={() =>
                  setSearchFilterState((prev) => ({
                    ...prev,
                    isOpened: prev.isOpened ? false : true,
                  }))
                }
              >
                <BiFilterAlt />
              </Button>
            }
          >
            <TextInput
              className="mb-3"
              label="filter"
              placeholder="絞り込みキーワード"
              description="タイトルでフィルタリングできます"
              value={searchFilterState.inputValue}
              onChange={handleOnChange}
            />
            {searchFilterState.inputValue ? (
              <div className="flex justify-end">
                <Button
                  variant="subtle"
                  compact
                  onClick={handleClickFilterCancel}
                >
                  cancel
                </Button>
              </div>
            ) : null}
          </Popover>
        </div>
      </div>

      <div className="block sm:hidden">
        <Popover
          position="bottom"
          placement="end"
          withArrow
          width={250}
          opened={isDisplayPopOpened}
          onClose={() => setIsDisplayPopOpened((o) => !o)}
          target={
            <Button
              compact
              variant="subtle"
              size="md"
              color="dark"
              onClick={() => setIsDisplayPopOpened((o) => !o)}
            >
              <BiFilterAlt />
            </Button>
          }
        >
          <SegmentedControl
            classNames={{
              root: "mr-2",
              control: "flex items-center",
              label: "px-3 py-[7px]",
            }}
            color="gray"
            data={[
              {
                value: "grid",
                label: <BsGrid3X3Gap />,
              },
              {
                value: "list",
                label: <AiOutlineUnorderedList />,
              },
            ]}
            value={format}
            onChange={(value) => setFormat(value)}
          />

          <SegmentedControl
            classNames={{
              root: "mr-2",
              control: "flex items-center",
              label: "px-3 py-[7px]",
            }}
            color="gray"
            data={[
              {
                value: "down",
                label: <BsSortNumericDown />,
              },
              {
                value: "up",
                label: <BsSortNumericUp />,
              },
            ]}
            value={time}
            onChange={(value) => setTime(value)}
          />

          <TextInput
            className="mb-3"
            label="filter"
            placeholder="絞り込みキーワード"
            description="タイトルでフィルタリングできます"
            value={searchFilterState.inputValue}
            onChange={handleOnChange}
          />
          {searchFilterState.inputValue ? (
            <div className="flex justify-end">
              <Button
                variant="subtle"
                compact
                onClick={handleClickFilterCancel}
              >
                cancel
              </Button>
            </div>
          ) : null}
        </Popover>
      </div>
    </div>
  );
};
