import { IColor } from "@pixel-world/types/color.types";
import { readFileSync } from "fs";

const pantoneColorsJson = readFileSync(
  "./src/data/pantone-colors.json",
  "utf8"
);

const pantoneColors = JSON.parse(pantoneColorsJson) as {
  names: string[];
  values: string[];
};

const primaryColorsJson = readFileSync(
  "./src/data/primary-colors.json",
  "utf8"
);

const primaryColors = JSON.parse(primaryColorsJson) as IColor[];

export { pantoneColors, primaryColors };
