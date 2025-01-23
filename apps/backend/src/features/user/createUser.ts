import { supabase } from "../../config/supabase";
import { generateRandomColor } from "../color/generateRandomColor";

export async function createUser(userId: string, email: string) {
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email) // TODO: use email beacuse a new is created at the registration
    .single();

  if (user) return { isError: true, message: "User already exists" };

  const selectColorHex = await supabase.from("users").select("color_hex_id");

  if (selectColorHex.error !== null)
    throw new Error(selectColorHex.error.message);

  const alreadyGeneratedIds = selectColorHex.data.map(
    (color) => color.color_hex_id as string,
  );

  const randomColor = generateRandomColor(alreadyGeneratedIds);

  const upsertUser = await supabase.from("users").upsert({
    ...(user ?? {}),
    id: userId,
    ...{ email, color_hex_id: randomColor },
  });

  if (upsertUser.error !== null) throw new Error(upsertUser.error.message);

  return {
    isError: false,
    message: `Registered ${userId} with color: ${randomColor}`,
  };
}
