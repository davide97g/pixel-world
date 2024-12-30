import { IColor } from "../../../../types/color.types";
import { pantoneColors } from "../../data";

export const generateColorForNewUser = async () => {
  const colorIndex = Math.random() * pantoneColors.length;
  const color = pantoneColors[Math.floor(colorIndex)] as IColor;
  return color;
};
