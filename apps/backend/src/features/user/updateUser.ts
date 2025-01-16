import { IUser } from "@pixel-world/types";
import { getFirestore } from "firebase-admin/firestore";

export function updateUser(uid: string, data: Partial<IUser>) {
  const db = getFirestore();
  const userRef = db.collection("users").doc(uid);
  return userRef.set(data, { merge: true });
}
