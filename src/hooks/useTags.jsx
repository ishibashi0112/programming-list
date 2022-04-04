import { fetcher } from "src/utils/fetcher";
import useSWRImmutable from "swr/immutable";

export const useTags = () => {
  const { data, error } = useSWRImmutable("/api/findAllTag", fetcher);

  return {
    data,
    error,
    isLoading: !error && !data,
  };
};
