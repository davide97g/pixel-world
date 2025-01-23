import { pantoneColors } from "../../data";
export function generateRandomColor(alreadyGeneratedColors: string[]) {
  const colors = pantoneColors.values.filter(
    (colorHex) => !alreadyGeneratedColors.includes(colorHex),
  );
  // now pick random color
  const randomIndex = Math.floor(Math.random() * colors.length);
  const color = colors[randomIndex];
  return color;
}
