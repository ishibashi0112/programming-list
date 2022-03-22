import Head from "next/head";
import React from "react";
import "tailwindcss/tailwind.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
