import { supabase } from "../../config/supabase";
import { assignToTeam } from "../color/assignToTeam";
import { generateRandomColorForUser } from "../color/generateRandomColor";

export async function createUser(userId: string, email: string) {
  const { data: user } = await supabase
    .from("USERS")
    .select("*")
    .eq("email", email)
    .single();

  if (user) return { isError: true, message: "User already exists" };

  const randomColor = await generateRandomColorForUser();
  if (!randomColor) throw new Error("Failed to generate random color");

  const teamColor = await assignToTeam();
  if (!teamColor.id) throw new Error("Failed to assign team color");

  const upsertUser = await supabase.from("USERS").upsert({
    ...(user ?? {}),
    id: userId,
    ...{ email, color_hex_id: randomColor.id, team_color_id: teamColor.id },
  });

  if (upsertUser.error !== null) throw new Error(upsertUser.error.message);

  return {
    isError: false,
    message: `Registered ${userId} with color: ${randomColor.id}`,
  };
}
