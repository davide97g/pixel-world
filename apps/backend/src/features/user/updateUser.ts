import { User } from "@supabase/supabase-js";
import { sql } from "../../config/database";
import { supabase } from "../../config/supabase";

export type UpdateUserError = {
  message: "User already exists" | "Failed to update user";
};

export async function updateUser(
  userId: string,
  data: { color_hex_id: string; email: string },
) {
  try {
    const user: User[] =
      await sql`SELECT * FROM public."USERS" WHERE email = ${data.email};`;

    if (user) return { message: "User already exists" };

    const { error } = await supabase
      .from("USERS")
      .upsert({ ...((user as User[])[0] ?? {}), id: userId, ...data });

    if (error !== null) {
      console.error(error);
      return { message: "Failed to update user" };
    }
    return true;
  } catch (error) {
    console.log(error);
    return { message: "Failed to update user" };
  }
}
