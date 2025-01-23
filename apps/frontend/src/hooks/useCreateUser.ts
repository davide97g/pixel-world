import { useAPI } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateUser = () => {
  const { createUser } = useAPI();

  return useMutation({
    mutationFn: async ({ uid, email }: { uid: string; email: string }) =>
      await createUser({ uid, email }),
  });
};
