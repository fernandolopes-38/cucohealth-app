import type { AxiosError, AxiosResponse } from "axios";
import useSWR from "swr";
import { api } from "../services/api";

export function useFetch<Data = AxiosResponse, Error = AxiosError>(
  url: string
) {
  const { data, error, mutate } = useSWR<Data, Error>(
    url,
    async (url: string) => {
      const response = await api.get(url);
      const { data, headers } = response;
      console.log(headers.link);
      const pagination = {
        total: headers["x-total-count"],
      };
      console.log(pagination);
      return data;
    }
  );
  return { data, error, mutate };
}
