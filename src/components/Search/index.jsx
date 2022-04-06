import { TextInput } from "@mantine/core";
import React, { useState, useCallback } from "react";
import { BiSearch } from "react-icons/bi";
import { useDebouncedValue } from "@mantine/hooks";
import { SearchResults } from "src/components/Search/SearchResults";

export const Search = () => {
  const [isShow, setIsShow] = useState(true);
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebouncedValue(value, 500, { leading: false });

  const handleOnChange = useCallback(async (e) => {
    setValue(e.currentTarget.value);
  }, []);

  const handleOnBlur = useCallback(() => {
    setIsShow(false);
  }, []);

  const hanndleOnfocus = useCallback(() => {
    if (!isShow) {
      setIsShow(true);
    }
  }, [isShow]);

  const handleDelete = useCallback(() => {
    setValue("");
  }, []);

  return (
    <div className="flex flex-col items-center">
      <TextInput
        className="w-full lg:w-4/5 rounded-b-none"
        classNames={{
          defaultVariant: "dark:bg-neutral-700 dark:border-neutral-700 ",
          input: "dark:text-gray-300",
          label: "dark:text-gray-300",
        }}
        icon={<BiSearch />}
        placeholder={"検索キーワードを入力してください"}
        value={value}
        rightSection={value ? <button onClick={handleDelete}>×</button> : null}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onFocus={hanndleOnfocus}
      />
      <div className="w-full lg:w-4/5">
        {debouncedValue ? <SearchResults value={debouncedValue} /> : null}
      </div>
    </div>
  );
};
