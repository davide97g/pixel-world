import { supabase } from "../../config/supabase";

export async function getUsers() {
  const { data: users, error } = await supabase.from("users").select("*");
  if (error) {
    console.error(error);
    return null;
  }
  return users;
}
