import { useAuth } from "@/context/AuthProvider";
import { useAPI } from "@/hooks/useAPI";
import { useQuery } from "@tanstack/react-query";

export const useGetUserColors = () => {
  const { getUserColors } = useAPI();

  const { user } = useAuth();
  return useQuery({
    queryKey: ["user", user?.id, "colors"],
    queryFn: getUserColors,
    enabled: !!user?.id,
  });
};
