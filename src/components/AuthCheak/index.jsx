import React, { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Alert, Button, Overlay } from "@mantine/core";
import { FiAlertCircle } from "react-icons/fi";

export const AuthCheak = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClickRedirect = useCallback(() => {
    router.replace("/auth/signin");
  }, [router]);

  if (!session) {
    return (
      <div className="flex justify-center w-96 ml-auto mt-5">
        <Overlay className="opacity-0 z-[60]" />
        <Alert
          classNames={{
            root: "z-[70] dark:bg-neutral-800",
            message: "dark:text-gray-300",
          }}
          icon={<FiAlertCircle size={16} />}
          color="red"
          title="セッションの有効期限が切れました。"
        >
          再ログインをお願いいたします。
          <Button
            className="dark:hover:bg-neutral-600"
            color="red"
            variant="subtle"
            compact
            onClick={handleClickRedirect}
          >
            OK
          </Button>
        </Alert>
      </div>
    );
  }
  return children;
};
