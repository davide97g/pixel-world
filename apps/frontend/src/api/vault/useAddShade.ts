import { api } from "@/config/client";
import { useMutation } from "@tanstack/react-query";

export const useAddShadeToVault = () => {
  return useMutation({
    mutationFn: ({ shadeId, uid }: { shadeId: string; uid: string }) =>
      api
        .post("/vault", {
          shadeId,
          uid,
        })
        .then((res) => res.data),
  });
};
