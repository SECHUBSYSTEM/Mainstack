import useSWR from "swr";
import api from "@/lib/axios";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useUser() {
  const { data, error, isLoading } = useSWR("/user", fetcher);
  return {
    user: data,
    isError: error,
    isLoading,
  };
}
