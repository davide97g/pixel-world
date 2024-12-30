import { IColor } from '../../../types/color.types';
import { auth } from '../config/firebase';

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
  getColorByHex: async (hex: string) => {
    return fetch(`${BACKEND_URL}/color/${hex}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (res.status === 200) {
          const resJson = await res.json();
          return resJson as { color: IColor };
        } else return { color: { name: 'Color not found' } };
      })
      .then((res) => res.color)
      .catch((err) => {
        console.info(err);
        return undefined;
      });
  },
  generateCustomColor: async () => {
    const idToken = await auth.currentUser?.getIdToken().catch((err) => {
      console.info(err);
      return null;
    });

    if (!auth.currentUser?.uid) return null;

    return fetch(`${BACKEND_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(idToken && { Authorization: `Bearer ${idToken}` }),
      },
    })
      .then((res) => res.json())
      .then(
        (res) =>
          res as {
            message: string;
            color: IColor;
          },
      );
  },
};
