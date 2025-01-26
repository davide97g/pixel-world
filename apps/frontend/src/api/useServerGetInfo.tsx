import { useAPI } from "@/hooks/useAPI";
import { useQuery } from "@tanstack/react-query";

export function useServerGetInfo() {
  const { getServerInfo } = useAPI();
  return useQuery({
    queryKey: ["server"],
    queryFn: () => getServerInfo(),
    staleTime: 1000 * 60 * 5,
  });
}
