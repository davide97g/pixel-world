import { readFileSync, writeFileSync } from "fs";

const PRIMARY_COLORS = {
  red: { hex: "#FF0000", rgb: [255, 0, 0] },
  green: { hex: "#00FF00", rgb: [0, 255, 0] },
  blue: { hex: "#0000FF", rgb: [0, 0, 255] },
  yellow: { hex: "#FFFF00", rgb: [255, 255, 0] },
  cyan: { hex: "#00FFFF", rgb: [0, 255, 255] },
  magenta: { hex: "#FF00FF", rgb: [255, 0, 255] },
  white: {
    hex: "#FFFFFF",
    rgb: [255, 255, 255],
  },
  black: {
    hex: "#000000",
    rgb: [0, 0, 0],
  },
  // orange: { hex: "#FFA500", rgb: [255, 165, 0] },
  // purple: { hex: "#800080", rgb: [128, 0, 128] },
  // pink: { hex: "#FFC0CB", rgb: [255, 192, 203] },
  // teal: { hex: "#008080", rgb: [0, 128, 128] },
  // lavender: { hex: "#E6E6FA", rgb: [230, 230, 250] },
};

// sensitivity to color difference
const EPSILON = 0;

// max density allowed
const MAX_DENSITY = 1000;

const pantone = JSON.parse(
  readFileSync("./output/pantone-colors-formatted.json", "utf8")
);

const distance = (color1, color2) => {
  const [r1, g1, b1] = color1;
  const [r2, g2, b2] = color2;
  return (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2;
};

const merge = (color1, color2, density1, density2) => {
  const [r1, g1, b1] = color1;
  const [r2, g2, b2] = color2;
  const density = density1 + density2;
  const lowDensityColor = density1 < density2 ? color1 : color2;
  const isLight = lowDensityColor.reduce((acc, x) => acc + x, 0) > 382;
  const merged = [
    (r1 * density1 + r2 * density2) / density,
    (g1 * density1 + g2 * density2) / density,
    (b1 * density1 + b2 * density2) / density,
  ];
  return merged.map((x) => (isLight ? Math.floor(x) : Math.ceil(x)));
};

const findClosestPrimaryColor = (color) => {
  let minDistance = Infinity;
  let closestColor = null;
  for (const [name, value] of Object.entries(PRIMARY_COLORS)) {
    const [r, g, b] = value.rgb;
    const d = distance(color, [r, g, b]);
    if (d < minDistance) {
      minDistance = d;
      closestColor = name;
    }
  }
  return closestColor;
};

const findBestMergeWithPrimaryColors = (color, target, density) => {
  let minDistance = Infinity;
  let bestPrimary = null;
  for (const [_, value] of Object.entries(PRIMARY_COLORS)) {
    const mergedColor = merge(color, value.rgb, density, 1);
    const distanceToMerged = distance(target, mergedColor);
    if (distanceToMerged < minDistance) {
      minDistance = distanceToMerged;
      bestPrimary = value.rgb;
    }
  }
  return bestPrimary;
};

const isEquals = (color1, color2) => color1.every((x, i) => x === color2[i]);

const findColorDensity = (targetColor) => {
  let density = 0;
  const primaryBase = findClosestPrimaryColor(targetColor);
  let currentColor = PRIMARY_COLORS[primaryBase].rgb;

  while (
    !isEquals(currentColor, targetColor) &&
    distance(targetColor, currentColor) > EPSILON &&
    density < MAX_DENSITY
  ) {
    const bestPrimaryMerge = findBestMergeWithPrimaryColors(
      currentColor,
      targetColor,
      density
    );
    currentColor = merge(currentColor, bestPrimaryMerge, density, 1);
    density++;
  }
  return {
    density,
    obtainedColor: currentColor,
    perfectMatch: isEquals(currentColor, targetColor),
  };
};

const pantoneDensities = pantone.map((pantoneColor) => {
  const { density, obtainedColor, perfectMatch } = findColorDensity(
    pantoneColor.rgb
  );
  return { ...pantoneColor, obtainedColor, perfectMatch, density };
});

writeFileSync(
  "./output/pantone-colors-densities.json",
  JSON.stringify(pantoneDensities, null, 2)
);

// compute the following metrics:
// max density
// min density
// average density
// standard deviation of density
// number of perfect matches

const maxDensity = Math.max(...pantoneDensities.map((x) => x.density));
const minDensity = Math.min(...pantoneDensities.map((x) => x.density));
const averageDensity =
  pantoneDensities.reduce((acc, x) => acc + x.density, 0) /
  pantoneDensities.length;
const standardDeviation = Math.sqrt(
  pantoneDensities.reduce(
    (acc, x) => acc + (x.density - averageDensity) ** 2,
    0
  ) / pantoneDensities.length
);
const perfectMatches = pantoneDensities.filter((x) => x.perfectMatch).length;

console.log("maxDensity", maxDensity);
console.log("minDensity", minDensity);
console.log("averageDensity", averageDensity);
console.log("standardDeviation", standardDeviation);
console.log("perfectMatches", (100 * perfectMatches) / pantoneDensities.length);
