import { readFileSync } from "fs";

const pantoneColorsJson = readFileSync(
  "./src/data/pantone-colors.json",
  "utf8"
);
const pantoneColors = JSON.parse(pantoneColorsJson);

export { pantoneColors };
