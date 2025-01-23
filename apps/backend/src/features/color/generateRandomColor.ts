export function generateRandomColor(alreadyGeneratedIds: string[]) {
  const colors = [];
  for (let r = 0; r < 256; r++) {
    for (let g = 0; g < 256; g++) {
      for (let b = 0; b < 256; b++) {
        const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
        if (alreadyGeneratedIds.includes(hex)) continue;
        colors.push(hex);
      }
    }
  }
  // now pick random color
  const randomIndex = Math.floor(Math.random() * colors.length);
  const color = colors[randomIndex];
  return color;
}
