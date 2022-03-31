import { fetcher } from "src/utils/fetcher";
import useSWR from "swr";

export const useMemos = () => {
  const { data, error } = useSWR("/api/memos/findAllMemo", fetcher);

  return {
    data,
    error,
    isLoading: !error && !data,
  };
};
