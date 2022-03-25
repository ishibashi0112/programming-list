import { fetcher } from "src/utils/fetcher";
import useSWR from "swr";

export const useTags = () => {
  const { data, error } = useSWR("/api/findAllTag", fetcher);

  return {
    data,
    error,
    isLoading: !error && !data,
  };
};
