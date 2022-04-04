import { getSession } from "next-auth/react";
import React from "react";
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

const Home = (props) => {
  // const { fallback } = props;
  // console.log(fallback);
  return (
    // <SWRConfig value={{ fallback }}>
    <div className="w-4/5">
      <NewForm />
    </div>
    // </SWRConfig>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
