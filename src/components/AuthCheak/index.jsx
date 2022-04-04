import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const AuthCheak = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.replace("/auth/signin");
  }

  return children;
};
