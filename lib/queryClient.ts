import { QueryClient } from "@tanstack/react-query";

export function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // disable annoying refetch on tab switch
        retry: 1, // only retry once on failure
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    },
  });
}
