import { api } from "@/config/client";
import { useMutation } from "@tanstack/react-query";

export const useAddVote = () => {
  return useMutation({
    mutationFn: ({ teamId, colorId }: { teamId: string; colorId: string }) =>
      api
        .post("/vote", {
          teamId,
          colorId,
        })
        .then((res) => res.data),
  });
};
