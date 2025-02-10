import { sql } from "../../config/database";

export async function getAllTeamShades({
  userId,
}: Readonly<{ userId: string }>) {
  try {
    const allTeamId: { team_color_id: string }[] = await sql`select distinct
  (team_color_id)
from
  public."VAULT"
  join public."SHADES" on public."SHADES".id = public."VAULT".shade_id
where
  user_id = ${userId};`;

    return { status: 200, data: allTeamId };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: `Failed to retrieve user's colors`,
    };
  }
}
