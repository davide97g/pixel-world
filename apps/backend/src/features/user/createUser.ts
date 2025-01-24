import { sql } from "../../config/database";
import { supabase } from "../../config/supabase";
import { assignToTeam } from "../color/assignToTeam";
import { generateRandomColorForUser } from "../color/generateRandomColor";

export async function createUser(userId: string, email: string) {
  try {
    const user: {
      uid: string;
      email: string;
      color_hex_id: string;
      team_color_id: string;
    }[] = await sql`SELECT * FROM public."USERS" WHERE email = ${email};`;

    if (user) return { isError: true, message: "User already exists" };

    const randomColor = await generateRandomColorForUser();
    if (!randomColor) throw new Error("Failed to generate random color");

    const teamColor = await assignToTeam();
    if (!teamColor.id) throw new Error("Failed to assign team color");

    const upsertUser = await supabase.from("USERS").upsert({
      ...((user[0] as {
        uid: string;
        email: string;
        color_hex_id: string;
        team_color_id: string;
      }[]) ?? {}),
      id: userId,
      ...{ email, color_hex_id: randomColor.id, team_color_id: teamColor.id },
    });

    if (upsertUser.error !== null) throw new Error(upsertUser.error.message);

    return {
      isError: false,
      message: `Registered ${userId} with color: ${randomColor.id}`,
    };
  } catch (error) {
    console.log(error);
    return { isError: true, message: "Failed to create user" };
  }
}
