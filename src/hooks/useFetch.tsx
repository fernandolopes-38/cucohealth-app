import type { AxiosError, AxiosResponse } from "axios";
import useSWR from "swr";
import { api } from "../services/api";

export function useFetch<Data = AxiosResponse, Error = AxiosError>(
  url: string
) {
  const { data, error } = useSWR<Data, Error>(url, async (url: string) => {
    return await api.get(url);
  });
  return { response: data, error, isLoading: !data && !error };
}
