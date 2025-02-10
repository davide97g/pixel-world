import { IShade } from "@pixel-world/types";
import { sql } from "../../config/database";

export async function getShadeForTeam({ teamId }: { teamId: string }) {
  try {
    const shades: IShade[] =
      await sql`select * from "SHADES" where team_color_id=${teamId};`;
    return shades;
  } catch (error) {
    console.log(error);
    return null;
  }
}
