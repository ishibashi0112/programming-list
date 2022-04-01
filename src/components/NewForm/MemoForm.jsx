import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { mutate } from "swr";
import RichTextEditor from "src/components/RichTextEditorImport";
import { useRouter } from "next/router";

const createMemo = async (value) => {
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  };

  const res = await fetch("/api/memos/createMemo", params);
  const json = await res.json();
  console.log(json);
  return json;
};

export const MemoForm = () => {
  const router = useRouter();
  const memoForm = useForm({
    initialValues: { memo: "" },
  });

  const handleSubmit = async (values) => {
    const newMemo = await createMemo(values);
    mutate("/api/memos/findAllMemo");
    memoForm.reset();
    router.push(`/memos/${newMemo.id}`);
  };

  return (
    <form className="w-full" onSubmit={memoForm.onSubmit(handleSubmit)}>
      <RichTextEditor
        className="mt-8 min-h-[300px]"
        controls={[
          ["bold", "h2", "italic", "underline", "strike"],
          ["unorderedList", "orderedList"],
          ["link", "codeBlock", "image"],
        ]}
        {...memoForm.getInputProps("memo")}
      />

      <Button className=" w-full mt-4 mb-10 bg-gray-500  " type="submit">
        Submit
      </Button>
    </form>
  );
};
