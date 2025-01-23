import { sql } from "../../config/database";

export async function assignToTeam(): Promise<{
  id: string;
  total: number;
}> {
  const teamDistribution =
    await sql`SELECT team_color_id, COUNT(*) FROM public."USERS" group by team_color_id`;

  const teamColors = teamDistribution.map((team) => ({
    id: team.team_color_id,
    total: team.count,
  }));
  // sort by total ascending
  teamColors.sort((a, b) => a.total - b.total);

  return teamColors[0] ?? { id: "#FF0000", total: 0 };
}
