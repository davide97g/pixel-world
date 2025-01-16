import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();

const getSecretJson = () => {
  const base64Secret = process.env.SECRET;
  if (!base64Secret) {
    throw new Error("No secret provided");
  }
  const stringSecret = Buffer.from(base64Secret, "base64").toString();
  if (!stringSecret) {
    throw new Error("Invalid secret provided");
  }
  const jsonSecret = JSON.parse(stringSecret);

  return jsonSecret;
};

const serviceAccount = getSecretJson();

export const initializeFirebaseApp = () =>
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
