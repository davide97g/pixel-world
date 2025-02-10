import { IShade } from "@pixel-world/types";
import { sql } from "../../config/database";

export async function getRandomShades({ userId }: { userId: string }) {
  const shadesAvailable: IShade[] =
    await sql`select * from "SHADES" where id not in (select "VAULT".shade_id from "VAULT" where "VAULT".user_id=${userId})`;

  if (shadesAvailable.length < 5) return shadesAvailable;

  const selectedShades = [];
  const copyShadeAvailable = [...shadesAvailable];
  for (let i = 0; i < 5; i++) {
    const n = Math.round(Math.random() * copyShadeAvailable.length);
    const elem = copyShadeAvailable.splice(n, 1)[0];
    selectedShades.push(elem);
  }

  return selectedShades;
}
