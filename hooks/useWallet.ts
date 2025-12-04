import useSWR from "swr";
import api from "@/lib/axios";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useWallet() {
  const { data, error, isLoading } = useSWR("/wallet", fetcher);
  return {
    wallet: data,
    isError: error,
    isLoading,
  };
}
