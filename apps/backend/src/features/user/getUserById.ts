import { User } from "@supabase/supabase-js";
import { sql } from "../../config/database";

export async function getUserById({ userId }: Readonly<{ userId: string }>) {
  try {
    const user: User[] =
      await sql`SELECT * FROM public."USERS" WHERE id = ${userId};`;

    return user[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
