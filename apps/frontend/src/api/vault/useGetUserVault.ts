import { api } from "@/config/client";
import { IShade } from "@pixel-world/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUserVault = ({ userId }: { userId?: string }) =>
  useQuery({
    queryKey: ["vault"],
    queryFn: () =>
      api.get(`/vault/user/${userId}`).then((res) => res.data as IShade[]),
    enabled: !!userId,
  });
