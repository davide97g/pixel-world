import { api } from "@/config/client";
import { ITeamColor } from "@pixel-world/types";
import { useQuery } from "@tanstack/react-query";

export const useGetTeams = () => {
  return useQuery({
    queryKey: ["teams"],
    queryFn:  () => api.get("/teams").then(res=>res.data as ITeamColor[]),
    staleTime: Infinity,
  });
};
