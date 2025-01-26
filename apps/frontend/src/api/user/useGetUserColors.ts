import { api } from "@/config/client";
import { IColor } from "@pixel-world/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUserColors = () => {
  return useQuery({
    queryKey: ["user",  "colors"],
    queryFn:  ()=> api.get("/user/colors").then(res=>res.data as IColor[]),
  });
};
