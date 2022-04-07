import Head from "next/head";
import React from "react";
import { SessionProvider } from "next-auth/react";
import "tailwindcss/tailwind.css";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionProvider session={session}>
      <MantineProvider>
        <NotificationsProvider position="top-right" autoClose={3000}>
          {getLayout(
            <>
              <Head>
                <title>PRG List</title>
              </Head>
              <Component {...pageProps} />
            </>
          )}
        </NotificationsProvider>
      </MantineProvider>
    </SessionProvider>
  );
};

export default MyApp;
