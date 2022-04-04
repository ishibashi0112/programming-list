import { Button, Loader, Modal } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useState, useCallback } from "react";
import { useSWRConfig } from "swr";

export const useDeleteFetchModal = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [deleteModalData, setDeleteModalData] = useState({});
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { apiUrl, mutateUrls, fetchData, titleValue, redirectUrl } =
    Object.keys(deleteModalData).length ? deleteModalData : {};

  const deleteFecth = useCallback(async () => {
    setIsLoading(true);
    const bodyParams = { data: fetchData };

    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyParams),
    };
    await fetch(apiUrl, params);
    await Promise.all(
      mutateUrls.map(async (url) => {
        await mutate(url);
      })
    );
    setIsModalOpened(false);
    setIsLoading(false);
    if (redirectUrl) {
      router.push(redirectUrl);
    }
  }, [router, fetchData, apiUrl, mutateUrls, redirectUrl]);

  return {
    isModalOpened,
    setDeleteModalData,
    setIsModalOpened,
    deleteModal: (
      <Modal
        classNames={{
          root: "your-root-class",
          inner: "your-inner-class",
          modal: "w-60",
          header: "justify-center",
          overlay: "",
          title: "justify-center",
          body: "flex justify-center items-center",
          close: "your-close-class",
        }}
        centered
        opened={isModalOpened}
        onClose={() => setIsModalOpened(isLoading ? true : false)}
        title={`${titleValue}を削除しますか？`}
        size="xs"
        shadow="xs"
        withCloseButton={false}
      >
        {isLoading ? (
          <Loader size="sm" />
        ) : (
          <div className="flex justify-center ">
            <Button
              className="m-1"
              color="red"
              variant="outline"
              onClick={deleteFecth}
            >
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
        )}
      </Modal>
    ),
  };
};
