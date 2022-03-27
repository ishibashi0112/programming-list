import { TextInput } from "@mantine/core";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDebouncedValue } from "@mantine/hooks";
import { SearchResults } from "src/components/Search/SearchResults";

export const Search = () => {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebouncedValue(value, 500, { leading: false });

  const handleOnChange = async (e) => {
    setValue(e.currentTarget.value);
  };

  return (
    <div className="relative mr-20">
      <TextInput
        className="w-96"
        icon={<BiSearch />}
        value={value}
        size={"xs"}
        onChange={handleOnChange}
      />
      <div className="absolute ">
        {debouncedValue ? <SearchResults value={debouncedValue} /> : null}
      </div>
    </div>
  );
};
