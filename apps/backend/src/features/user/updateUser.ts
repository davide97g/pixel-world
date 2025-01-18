import { IColor } from "@pixel-world/types";
import { supabase } from "../../config/supabase";

export async function updateUser(userId: string, data: { color: IColor }) {
  const user = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (!user) {
    throw new Error(`User not found: ${userId}`);
  }

  return supabase.from("users").upsert({ ...user, ...data });
}
