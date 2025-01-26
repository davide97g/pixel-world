import { api } from "@/config/client";
import { IVote, IVoteTotal } from "@pixel-world/types";
import { useQuery } from "@tanstack/react-query";

export const useGetVotes = () => {
  return useQuery({
    queryKey: ["votes"],
    queryFn: () => 
      api.get("/votes").then(res=>res.data as { votes: IVote[], totals:IVoteTotal[]}),
    refetchInterval: 5000,
    structuralSharing: true,
  });
};
