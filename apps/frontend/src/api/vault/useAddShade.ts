import { api } from "@/config/client";
import { useMutation } from "@tanstack/react-query";

export const useAddShadeToVault = () => {
  return useMutation({
    mutationFn: ({ shadeId }: { shadeId: string }) =>
      api
        .post("/vault", {
          shadeId,
        })
        .then((res) => res.data),
  });
};
