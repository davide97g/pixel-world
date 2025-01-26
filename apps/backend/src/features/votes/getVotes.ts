import { IColorVote, IColorVoteTotal } from "@pixel-world/types";
import { sql } from "../../config/database";

export async function getVotes({ limit = 100 }: { limit?: number }) {
  try {
    const votes: IColorVote[] =
      await sql`select * from public."VOTES" order by created_at limit ${limit};`;
    const totals: IColorVoteTotal[] =
      await sql`select team_id, count(*) as total from public."VOTES" group by team_id;`;

    return { votes, totals };
  } catch (error) {
    console.log(error);
    return null;
  }
}
