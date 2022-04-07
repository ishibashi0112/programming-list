import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AuthCheak } from "src/components/AuthCheak";
import { NewForm } from "src/components/NewForm";
import Layout from "src/layout";
import { fetcher } from "src/utils/fetcher";
import { SWRConfig } from "swr";

// export const getServerSideProps = async (ctx) => {
//   const session = await getSession(ctx);

//   if (!session) {
//     return { props: {} };
//   }

//   const FOLDERS_API_URL = `http://localhost:3000/api/folders/findAllFolder`;
//   const MEMOS_API_URL = `http://localhost:3000/api/memos/findAllMemo`;

//   const folders = await fetch(
//     `${FOLDERS_API_URL}?userId=${session.userId}`,
//     fetcher
//   );
//   const memos = await fetch(
//     `${MEMOS_API_URL}?userId=${session.userId}`,
//     fetcher
//   );

//   const foldersData = await folders.json();
//   const memosData = await memos.json();

//   return {
//     props: {
//       fallback: {
//         [FOLDERS_API_URL]: foldersData,
//         [MEMOS_API_URL]: memosData,
//       },
//     },
//   };
// };

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};

const Home = (props) => {
  // const { fallback } = props;
  return (
    // <SWRConfig value={{ fallback }}>
    <AuthCheak>
      <div className="w-full  md:w-[calc(100%-230px)] md:ml-auto lg:w-4/5 dark:bg-black">
        <NewForm />
      </div>
    </AuthCheak>
    // </SWRConfig>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
