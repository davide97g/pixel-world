import { IColor } from "../../../../types/color.types";

export const generateColorForNewUser = async (uid: string) => {
  const color: IColor = {
    hex: "#000000",
    rgb: [0, 0, 0],
    density: 0,
    name: "Black",
  };
  return color;
};
