const BACKEND_URL = 'http://localhost:3000';

export const API = {
  getServerInfo: async () => {
    return fetch(`${BACKEND_URL}`)
      .then((res) => res.json())
      .then((res) => res as { version: string })
      .catch((err) => {
        console.info(err);
        return { version: 'unknown' };
      });
  },
};
