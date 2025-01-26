import { api } from "@/config/client";
import { useAuth } from "@/context/AuthProvider";
import { IColor } from "@pixel-world/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUserColors = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["user", user?.id, "colors"],
    queryFn: () =>
      api.get(`/vault/user/${user?.id}`).then((res) => res.data as IColor[]),
    enabled: !!user?.id,
  });
};
