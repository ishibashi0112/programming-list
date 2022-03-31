import { Loader } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMemo as useMemoId } from "src/hooks/useMemo";
import RichTextEditor from "src/components/RichTextEditorImport";

export const Memo = () => {
  const router = useRouter();
  const { data: memo, error, isLoading } = useMemoId();
  const [text, setText] = useState("");
  console.log(memo);

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (memo) {
      setText(memo.body);
    }
  }, [memo]);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-48px)] flex justify-center items-center">
        <Loader size="sm" />
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="p-4">
      {/* <h1 className="flex items-center mb-5  font-bold text-lg ">
        <p className="flex items-center">
          <AiOutlineFolder />
        </p>
        <p className=" pr-1">{router.query?.folderName}</p>

        <p className=""> {`${posts.length}件`}</p>
      </h1> */}

      <RichTextEditor value={text} onChange={handleOnChange} readOnly />
    </div>
  );
};
