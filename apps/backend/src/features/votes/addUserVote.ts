import { sql } from "../../config/database";

export async function addUserVote({
  userId,
  teamId,
  colorId,
}: {
  userId: string;
  teamId: string;
  colorId: string;
}) {
  try {
    const res =
      await sql`SELECT team_color_id from public."COLORS" where id=${colorId} and team_color_id=${teamId};`;
    console.log(res);

    if (res.count > 0) {
      await sql`INSERT INTO public."VOTES" (user_id, team_id, color_id) VALUES (${userId}, ${teamId}, ${colorId});`;

      return {
        status: 201,
        message: `User ${userId} voted with for ${teamId} with color ${colorId}`,
      };
    } else {
      return {
        status: 400,
        message: `Color ${colorId} does not belong to team ${teamId}`,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: `Failed to add user ${userId} vote for team ${teamId} with color ${colorId}`,
    };
  }
}
