import { fetcher } from "src/utils/fetcher";
import useSWRImmutable from "swr/immutable";

export const useFolders = () => {
  const { data, error } = useSWRImmutable(
    "/api/folders/findAllFolder",
    fetcher
  );

  return {
    data,
    error,
    isLoading: !error && !data,
  };
};
