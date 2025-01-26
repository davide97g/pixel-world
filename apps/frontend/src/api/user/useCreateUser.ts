import { api } from "@/config/client";
import { useMutation } from "@tanstack/react-query";

export const useCreateUser = () => {
  return useMutation({
    mutationFn:  ({ uid, email }: { uid: string; email: string }) => 
       api.post("/user", { uid, email }).then((res) => res.data)
  });
};
