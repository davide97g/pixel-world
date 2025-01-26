import { IColor } from "@pixel-world/types";
import { sql } from "../../config/database";

export async function getUserColors({ userId }: Readonly<{ userId: string }>) {
  try {
    const colors: IColor[] =
      await sql`select id, name, team_color_id, public."COLORS".created_at from public."VAULT" join public."COLORS" on public."VAULT".color_id=public."COLORS".id where user_id=${userId}`;

    return { status: 200, data: colors };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: `Failed to retrieve user's colors`,
    };
  }
}
