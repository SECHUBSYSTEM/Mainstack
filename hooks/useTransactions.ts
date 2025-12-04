import useSWR from "swr";
import api from "@/lib/axios";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useTransactions() {
  const { data, error, isLoading } = useSWR("/transactions", fetcher);
  return {
    transactions: data,
    isError: error,
    isLoading,
  };
}
