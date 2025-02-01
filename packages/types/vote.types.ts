export interface IVote {
  id: string;
  created_at: string;
  user_id: string;
  shade_id: string;
  team_id: string;
}

export interface IVoteTotal {
  team_id: string;
  total: number;
}
