import { api } from "@/config/client";
import { useQuery } from "@tanstack/react-query";

export function useServerGetInfo() {
  return useQuery({
    queryKey: ["server"],
    queryFn: () => api.get("/").then((res) => res.data as { version: string }),
    staleTime: 1000 * 60 * 5,
  });
}
