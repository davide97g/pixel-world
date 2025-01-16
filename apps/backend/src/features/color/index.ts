import { pantoneColors } from "../../data";

export const generateColorForNewUser = async () => {
  const colorIndex = Math.random() * pantoneColors.length;
  const color = pantoneColors[Math.floor(colorIndex)];
  return color;
};

export const getColorByHex = (hex: string) =>
  pantoneColors.find((color) => color.value === hex);
