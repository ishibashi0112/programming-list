import Head from "next/head";
import React from "react";
import Layout from "src/layout";
import "tailwindcss/tailwind.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
