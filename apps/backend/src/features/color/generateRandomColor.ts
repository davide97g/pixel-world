import { sql } from "../../config/database";
import { supabase } from "../../config/supabase";

function extractRandomColorFromUnchosen(alreadyChosenColors: string[]) {
  if (alreadyChosenColors.length !== 0)
    return sql`SELECT id, name FROM public."COLORS" WHERE id NOT IN (${alreadyChosenColors}) ORDER BY RANDOM() LIMIT 1;`;
  return sql`SELECT id, name FROM public."COLORS" ORDER BY RANDOM() LIMIT 1;`;
}

export async function generateRandomColorForUser() {
  const { data, error } = await supabase.from("USERS").select("color_hex_id");
  if (error) {
    console.log(error);
    return null;
  }
  const colors = data.map((user) => user.color_hex_id);

  const notChosenColorsQuery = await extractRandomColorFromUnchosen(colors);

  if (!notChosenColorsQuery.length) {
    console.log(notChosenColorsQuery);
    return null;
  }

  return notChosenColorsQuery[0] as {
    id: string;
    name: string;
  };
}
