import { useRouter } from "next/router";
import { fetcher } from "src/utils/fetcher";
import useSWR from "swr";

export const useMemo = () => {
  const router = useRouter();
  const { data, error } = useSWR(
    router.query.id ? `/api/memos/findMemo/?memoId=${router.query.id}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading: !error && !data,
  };
};
