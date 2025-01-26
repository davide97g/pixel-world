import { useAPI } from "@/hooks/useAPI";
import { useMutation } from "@tanstack/react-query";

export const useAddVote = () => {
  const { vote } = useAPI();

  return useMutation({
    mutationFn: ({ teamId, colorId }: { teamId: string; colorId: string }) =>
      vote({ teamId, colorId }),
  });
};
