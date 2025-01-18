import { IUser } from "@pixel-world/types";

const BACKEND_URL = import.meta.env.VITE_SERVER_URL;

export async function getUserInfo({ access_token }: { access_token?: string }) {
  if (!access_token) throw new Error("Access token is required");
  const res = await fetch(`${BACKEND_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(access_token && { Authorization: `Bearer ${access_token}` }),
    },
  }).then((res) => res.json());

  if (res.error) throw new Error(res.error);
  return res.user as IUser;
}
