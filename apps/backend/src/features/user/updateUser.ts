import { supabase } from "../../config/supabase";

export type UpdateUserError = {
  message: "User already exists" | "Failed to update user";
};

export async function updateUser(
  userId: string,
  data: { color_hex_id: string; email: string }
) {
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (user) return { message: "User already exists" };

  const { error } = await supabase
    .from("users")
    .upsert({ ...(user ?? {}), id: userId, ...data });

  if (error !== null) {
    console.error(error);
    return { message: "Failed to update user" };
  }
  return true;
}
