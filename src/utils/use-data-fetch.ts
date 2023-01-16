import { Key, SWRConfiguration } from "swr";
import useSWRImmutable from "swr/immutable";

export async function fetcher<T>(url: string) {
  const res = await fetch(url);
  return (await res.json()) as T;
}

export function useDataFetch<Data, Error = any>(
  key: Key,
  config?: SWRConfiguration
) {
  // Using SWRImmutable here to avoid refetch on stale/focus/reconnect
  // https://swr.vercel.app/docs/revalidation#disable-automatic-revalidations
  return useSWRImmutable<Data, Error>(key, fetcher, config);
}
