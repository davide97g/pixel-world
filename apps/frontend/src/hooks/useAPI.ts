import { useAuth } from "@/hooks/useAuth";
import { IColor, IUser } from "@pixel-world/types";

const BACKEND_URL = import.meta.env.VITE_SERVER_URL;

export const useAPI = () => {
  const { session } = useAuth();
  const access_token = session?.access_token;

  const getServerInfo = async () => {
    return fetch(`${BACKEND_URL}`)
      .then((res) => res.json())
      .then((res) => res as { version: string });
  };

  const getUser = async () => {
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
  };

  const getUserColors = async () => {
    if (!access_token) throw new Error("Access token is required");
    const res = await fetch(`${BACKEND_URL}/user/colors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(access_token && { Authorization: `Bearer ${access_token}` }),
      },
    }).then((res) => res.json());

    if (res.error) throw new Error(res.error);
    return res as IColor[];
  };

  const createUser = async ({ uid, email }: { uid: string; email: string }) => {
    return fetch(`${BACKEND_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, email }),
    }).then((res) => {
      if (res.status === 201) return res.json();
      throw new Error("Failed to create user");
    });
  };

  // *** VOTE

  const vote = async ({
    teamId,
    colorId,
  }: {
    teamId: string;
    colorId: string;
  }) => {
    if (!access_token) throw new Error("Access token is required");
    console.info("Voting for", teamId, colorId);
    return fetch(`${BACKEND_URL}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(access_token && { Authorization: `Bearer ${access_token}` }),
      },
      body: JSON.stringify({
        teamId,
        colorId,
      }),
    }).then((res) => {
      if (res.status === 201) return res.json();
      throw new Error("Failed to add vote");
    });
  };

  return {
    getServerInfo,
    getUser,
    getUserColors,
    createUser,
    vote,
  };
};
