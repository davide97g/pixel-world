import { api } from "@/config/client";
import { IShade } from "@pixel-world/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUserVaultForTeam = ({
  userId,
  teamId,
}: {
  userId?: string;
  teamId: string;
}) =>
  useQuery({
    queryKey: ["vault/teamId", userId, teamId],
    queryFn: () =>
      api
        .post(`/vault/user/${userId}/teamId`, { teamId })
        .then((res) => res.data as IShade[]),
    enabled: !!userId && teamId !== "",
  });
