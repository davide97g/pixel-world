import { api } from "@/config/client";
import { IUser } from "@pixel-world/types";

export async function getUserInfo({ access_token }: { access_token?: string }) {
  if (!access_token) throw new Error("Access token is required");

  const res = await api
    .get(`/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(access_token && { Authorization: `Bearer ${access_token}` }),
      },
    })
    .then((res) => res.data as IUser);

  return res;
}
