export enum SHADE_TYPE {
  BASIC = "BASIC",
  PASTEL = "PASTEL",
}

export interface IShade {
  id: string;
  created_at: string;
  team_color_id: string;
  locked: boolean;
  name: string;
  type: SHADE_TYPE;
}
