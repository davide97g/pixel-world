import { api } from "@/config/client";
import { IShade } from "@pixel-world/types";
import { useQuery } from "@tanstack/react-query";

export const useGetShades = () => {
  return useQuery({
    queryKey: ["shades"],
    queryFn: () => api.get("/shades/all").then((res) => res.data as IShade[]),
    staleTime: Infinity,
  });
};
