import { useAPI } from "@/hooks/useAPI";
import { useQuery } from "@tanstack/react-query";

export const useGetTeams = () => {
  const { getTeams } = useAPI();

  return useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
    staleTime: Infinity,
  });
};
