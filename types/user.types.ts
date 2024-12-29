import { IColor } from "./color.types";

export interface IUser {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  color: IColor;
}
