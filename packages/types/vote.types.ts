export interface IColorVote {
  created_at: string;
  user_id: string;
  color_id: string;
  team_id: string;
}

export interface IColorVoteTotal {
  team_id: string;
  total: number;
}
