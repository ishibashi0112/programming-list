import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { showNotification } from "@mantine/notifications";

export const notifications = (title, errorMessage) => {
  showNotification({
    classNames: {
      root: "dark:bg-neutral-700 dark:border-neutral-700",
      icon: "bg-white",
      title: "dark:text-gray-300",
      closeButton: "dark:text-gray-300 dark:hover:bg-neutral-700",
    },
    title: title,
    message: `Error: ${errorMessage}`,
    color: "red",
    icon: <FiAlertTriangle />,
  });
};
