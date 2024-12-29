import { readFileSync, writeFileSync } from "fs";
const PantoneColorsText = readFileSync("./input/pantone-colors.json", "utf8");
const PantoneColors = JSON.parse(PantoneColorsText);

console.info(Object.keys(PantoneColors.names).length);
console.info(Object.keys(PantoneColors.values).length);
const names = Object.keys(PantoneColors.names);
const PatoneColorsFormatted = names.map((name, index) => {
  const hex = PantoneColors.values[index];
  const rgb = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return {
    name: PantoneColors.names[name],
    value: PantoneColors.values[index],
    rgb,
  };
});

console.info(PatoneColorsFormatted);

writeFileSync(
  "./output/pantone-colors-formatted.json",
  JSON.stringify(PatoneColorsFormatted, null, 2)
);
