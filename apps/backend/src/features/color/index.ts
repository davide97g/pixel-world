import { pantoneColors } from "../../data";

export const generateColorForNewUser = async () => {
  const colorIndex = Math.random() * pantoneColors.values.length;
  const color = pantoneColors.values[Math.floor(colorIndex)];
  return color;
};
