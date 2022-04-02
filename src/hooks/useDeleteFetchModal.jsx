import { Button, Modal } from "@mantine/core";
import React, { useState } from "react";
import { useSWRConfig } from "swr";

export const useDeleteFetchModal = (API_URL, MUTATE_URL) => {
  const { mutate } = useSWRConfig();
  const [fetchData, setFetchData] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [isModalOpened, setIsModalOpened] = useState(false);

  const deleteFecth = async () => {
    const bodyParams = { data: fetchData };
    console.log(bodyParams);
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyParams),
    };
    await fetch(API_URL, params);
    setIsModalOpened(false);
    mutate(MUTATE_URL);
  };

  return {
    isModalOpened,
    setIsModalOpened,
    setFetchData,
    setTitleValue,
    deleteModal: (
      <Modal
        classNames={{
          root: "your-root-class",
          inner: "your-inner-class",
          modal: "w-60",
          header: "justify-center",
          overlay: "",
          title: "justify-center",
          body: "your-body-class",
          close: "your-close-class",
        }}
        opened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        title={`${titleValue}を削除しますか？`}
        size="xs"
        shadow="xs"
        withCloseButton={false}
      >
        <div className="flex justify-center ">
          <Button className="m-1" variant="outline" onClick={deleteFecth}>
            削除
          </Button>
          <Button
            className="m-1"
            variant="outline"
            onClick={() => setIsModalOpened(false)}
          >
            キャンセル
          </Button>
        </div>
      </Modal>
    ),
  };
};
