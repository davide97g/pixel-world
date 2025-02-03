import { api } from "@/config/client";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTeamIdOwned = () =>
  useQuery({
    queryKey: ["allTeamId"],
    queryFn: () =>
      api
        .get("/vault/all-team-id")
        .then((res) => res.data as { team_color_id: string }[]),
  });
