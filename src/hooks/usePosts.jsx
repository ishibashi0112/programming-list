import { fetcher } from "src/utils/fetcher";
import useSWR from "swr";

export const usePosts = () => {
  const { data, error } = useSWR("/api/findAllPost", fetcher);

  return {
    data,
    error,
    isLoading: !error && !data,
  };
};
