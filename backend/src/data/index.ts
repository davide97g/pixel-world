import { readFileSync } from "fs";
import { IColor } from "../../../types/color.types";

const pantoneColorsJson = readFileSync(
  "./src/data/pantone-colors.json",
  "utf8"
);
const pantoneColors = JSON.parse(pantoneColorsJson) as IColor[];

export { pantoneColors };
