import useSWR, { Key, SWRConfiguration } from "swr";

export async function fetcher<T>(url: string) {
  const res = await fetch(url);
  return (await res.json()) as T;
}

export function useDataFetch<Data, Error = any>(
  key: Key,
  config?: SWRConfiguration
) {
  return useSWR<Data, Error>(key, fetcher, config);
}
