import { supabase } from "@/config/supabase";
import { useAPI } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { getUser } = useAPI();

  return useQuery({
    queryKey: ["user", supabase.auth.getSession()],
    queryFn: async () => getUser(),
    enabled: supabase.auth.getSession() !== null,
  });
};
