import { api } from "@/config/client";
import { IShade } from "@pixel-world/types";
import { useQuery } from "@tanstack/react-query";

export const useGetShadesForTeam = ({ teamId }: { teamId: string }) => {
  return useQuery({
    queryKey: ["shades for team", teamId],
    queryFn: () =>
      api
        .post("/shades/team-id", { teamId })
        .then((res) => res.data as IShade[]),
  });
};
