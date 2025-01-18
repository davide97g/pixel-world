import { IColor } from "./color.types";

export interface IUser {
  id: string;
  email: string;
  color?: IColor;
  colorId: string;
}
