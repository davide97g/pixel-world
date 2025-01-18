import { useAuth } from "../hooks/useAuth";

const BACKEND_URL = import.meta.env.VITE_SERVER_URL;

export const useAPI = () => {
  const { session } = useAuth();
  const access_token = session?.access_token;

  const getServerInfo = () => {
    return fetch(`${BACKEND_URL}`)
      .then((res) => res.json())
      .then((res) => res as { version: string })
      .catch((err) => {
        console.info(err);
        return { version: "unknown" };
      });
  };

  const getUser = async () => {
    const res = await fetch(`${BACKEND_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(access_token && { Authorization: `Bearer ${access_token}` }),
      },
    });
    const res_1 = await res.json();
    return res_1 as {
      id: string;
      email: string;
      created_at: string;
    };
  };

  return {
    getServerInfo,
    getUser,
  };
};
