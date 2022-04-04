import { TextInput } from "@mantine/core";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDebouncedValue } from "@mantine/hooks";
import { SearchResults } from "src/components/Search/SearchResults";
import { useHotkeys } from "@mantine/hooks";

export const Search = () => {
  const [isShow, setIsShow] = useState(true);
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebouncedValue(value, 500, { leading: false });
  const a = useHotkeys([["mod+K", () => console.log("Trigger search")]]);
  console.log(a);

  const handleOnChange = async (e) => {
    setValue(e.currentTarget.value);
  };

  const handleOnBlur = () => {
    setIsShow(false);
  };

  const hanndleOnfocus = () => {
    if (!isShow) {
      setIsShow(true);
    }
  };

  const handleDelete = () => {
    setValue("");
  };

  return (
    <div className="flex flex-col items-center">
      <TextInput
        className="w-4/5 rounded-b-none"
        icon={<BiSearch />}
        value={value}
        rightSection={value ? <button onClick={handleDelete}>×</button> : null}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onFocus={hanndleOnfocus}
      />
      <div className="w-4/5">
        {debouncedValue ? <SearchResults value={debouncedValue} /> : null}
      </div>
    </div>
  );
};
