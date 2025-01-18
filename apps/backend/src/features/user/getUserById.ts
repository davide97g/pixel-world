import { supabase } from "../../config/supabase";

export async function getUserById({ userId }: Readonly<{ userId: string }>) {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  return users;
}
