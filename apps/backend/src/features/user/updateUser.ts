import { supabase } from "../../config/supabase";

export async function updateUser(
  userId: string,
  data: { color_hex_id: string },
) {
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  const { error } = await supabase
    .from("users")
    .upsert({ ...(user ?? {}), id: userId, ...data });

  if (error !== null) {
    console.error(error);
    return false;
  }
  return true;
}
