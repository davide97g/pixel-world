import { useAuth } from "@/context/AuthProvider";
import { useAPI } from "@/hooks/useAPI";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { user } = useAuth();
  const { getUser } = useAPI();

  return useQuery({
    queryKey: ["user", user?.id],
    queryFn: getUser,
    enabled: !!user?.id,
  });
};
