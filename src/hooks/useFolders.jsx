import { fetcher } from "src/utils/fetcher";
import useSWR from "swr";

export const useFolders = () => {
  const { data, error } = useSWR("/api/folders/findAllFolder", fetcher);

  return {
    data,
    error,
    isLoading: !error && !data,
  };
};
