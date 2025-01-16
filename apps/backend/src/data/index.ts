import { IColor } from "@pixel-world/types/color.types";
import { readFileSync } from "fs";

const pantoneColorsJson = readFileSync(
  "./src/data/pantone-colors.json",
  "utf8"
);
const pantoneColors = JSON.parse(pantoneColorsJson) as IColor[];

export { pantoneColors };
