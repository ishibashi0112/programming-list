import { TextInput } from "@mantine/core";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDebouncedValue } from "@mantine/hooks";
import { SearchResults } from "src/components/Search/SearchResults";

export const Search = () => {
  const [isShow, setIsShow] = useState(true);
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebouncedValue(value, 500, { leading: false });

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
    <div className="relative mr-20">
      <TextInput
        className="w-96"
        icon={<BiSearch />}
        value={value}
        size={"xs"}
        rightSection={value ? <button onClick={handleDelete}>×</button> : null}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onFocus={hanndleOnfocus}
      />
      <div className={isShow ? "absolute " : "hidden absolute "}>
        {debouncedValue ? <SearchResults value={debouncedValue} /> : null}
      </div>
    </div>
  );
};
