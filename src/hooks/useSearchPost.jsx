import { fetcher } from "src/utils/fetcher";
import useSWR from "swr";

export const useSearchPost = (value) => {
  const { data, error } = useSWR(
    `/api/posts/searchPost/?keyword=${value}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading: !error && !data,
    isEmpty: data && data.length === 0,
  };
};
