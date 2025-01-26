import { api } from "@/config/client";
import { IColorVote, IColorVoteTotal } from "@pixel-world/types";
import { useQuery } from "@tanstack/react-query";

export const useGetVotes = () => {
  return useQuery({
    queryKey: ["votes"],
    queryFn: () => 
      api.get("/votes").then(res=>res.data as { votes: IColorVote[], totals:IColorVoteTotal[]}),
    refetchInterval: 5000,
    structuralSharing: true,
  });
};
