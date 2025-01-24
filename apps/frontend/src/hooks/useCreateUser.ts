import { useAPI } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateUser = () => {
  const { createUser } = useAPI();

  return useMutation({
    mutationFn: ({ uid, email }: { uid: string; email: string }) =>
      createUser({ uid, email }),
  });
};
