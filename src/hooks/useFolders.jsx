import { fetcher } from "src/utils/fetcher";
import useSWR from "swr";

export const useFolders = () => {
  const { data, error } = useSWR("/api/findAllFolder", fetcher);

  return {
    data,
    error,
    isLoading: !error && !data,
  };
};
