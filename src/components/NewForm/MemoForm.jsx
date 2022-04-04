import { Button, Loader, Overlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useCallback, useState } from "react";
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
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const memoForm = useForm({
    initialValues: { memo: "" },
  });

  const handleSubmit = useCallback(
    async (values) => {
      //空と空行のみは処理をスルー
      if (values.memo.replace(/(<([^>]+)>)/gi, "")) {
        setIsSubmitLoading(true);
        const newMemo = await createMemo(values);
        await mutate("/api/memos/findAllMemo");
        memoForm.reset();
        setIsSubmitLoading(false);
        router.push(`/memos/${newMemo.id}`);
      }
    },
    [memoForm, router]
  );

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
      {isSubmitLoading ? (
        <div className="flex justify-center mt-8">
          <Loader color="gray" variant="dots" />
          <Overlay opacity={0} color="#000" />
        </div>
      ) : (
        <Button className=" w-full mt-4 mb-10 bg-gray-500  " type="submit">
          Submit
        </Button>
      )}
    </form>
  );
};
