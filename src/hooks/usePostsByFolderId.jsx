import { useRouter } from "next/router";
import { fetcher } from "src/utils/fetcher";
import useSWR from "swr";

export const usePostsByFolderId = () => {
  const router = useRouter();
  const folderId = router.query.id;
  const { data, error } = useSWR(
    folderId ? `/api/findPost?folder_id=${folderId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading: !error && !data,
    isEmpty: data && data.length === 0,
  };
};
