import { fetcher } from "src/utils/fetcher";
import useSWRImmutable from "swr/immutable";

export const useMemos = () => {
  const { data, error } = useSWRImmutable("/api/memos/findAllMemo", fetcher);

  return {
    data,
    error,
    isLoading: !error && !data,
  };
};
