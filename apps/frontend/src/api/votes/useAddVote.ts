import { api } from "@/config/client";
import { useMutation } from "@tanstack/react-query";

export const useAddVote = () => {
  return useMutation({
    mutationFn: ({ teamId, shadeId }: { teamId: string; shadeId: string }) =>
      api
        .post("/vote", {
          teamId,
          shadeId,
        })
        .then((res) => res.data),
  });
};
