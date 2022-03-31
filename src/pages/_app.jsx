import Head from "next/head";
import React from "react";

import { SessionProvider } from "next-auth/react";
import "tailwindcss/tailwind.css";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={session}>
      {getLayout(
        <>
          <Head>
            <title>Create Next App</title>
          </Head>
          <Component {...pageProps} />
        </>
      )}
    </SessionProvider>
  );
};

export default MyApp;
