import { useAPI } from "@/hooks/useAPI";
import { useQuery } from "@tanstack/react-query";

export const useGetVotes = () => {
  const { getVotes } = useAPI();

  return useQuery({
    queryKey: ["votes"],
    queryFn: getVotes,
    refetchInterval: 5000,
    structuralSharing: true,
  });
};
