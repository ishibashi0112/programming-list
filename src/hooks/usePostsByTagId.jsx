import { useRouter } from "next/router";
import { fetcher } from "src/utils/fetcher";
import useSWR from "swr";

export const usePostsByTagId = () => {
  const router = useRouter();
  const tagId = router.query.id;
  const { data, error } = useSWR(
    tagId ? `/api/findPost?tag_id=${tagId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading: !error && !data,
  };
};
