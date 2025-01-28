import { Button } from "@/components/ui/button";
import { useState } from "react";

// Expanded color categories and their hex values
const colorCategories = {
  "Primary Colors": [
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
  ],
  "Secondary Colors": [
    { name: "Green", hex: "#00FF00" },
    { name: "Purple", hex: "#800080" },
    { name: "Orange", hex: "#FFA500" },
  ],
  "Tertiary Colors": [
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Magenta", hex: "#FF00FF" },
    { name: "Lime", hex: "#BFFF00" },
    { name: "Teal", hex: "#008080" },
    { name: "Indigo", hex: "#4B0082" },
  ],
  "Basic Shades": [
    { name: "White", hex: "#FFFFFF" },
    { name: "Light Gray", hex: "#D3D3D3" },
    { name: "Gray", hex: "#808080" },
    { name: "Dark Gray", hex: "#A9A9A9" },
    { name: "Black", hex: "#000000" },
  ],
  "Pastel Colors": [
    { name: "Pastel Pink", hex: "#FFD1DC" },
    { name: "Pastel Blue", hex: "#A7C7E7" },
    { name: "Pastel Green", hex: "#77DD77" },
    { name: "Pastel Yellow", hex: "#FDFD96" },
    { name: "Pastel Lavender", hex: "#E6E6FA" },
  ],
  "Earth Tones": [
    { name: "Brown", hex: "#A52A2A" },
    { name: "Beige", hex: "#F5F5DC" },
    { name: "Olive", hex: "#808000" },
    { name: "Sienna", hex: "#A0522D" },
    { name: "Khaki", hex: "#F0E68C" },
  ],
};

export default function HueVault() {
  const [unlockedColors, setUnlockedColors] = useState<Set<string>>(new Set());

  const toggleColor = (hex: string) => {
    setUnlockedColors((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(hex)) {
        newSet.delete(hex);
      } else {
        newSet.add(hex);
      }
      return newSet;
    });
  };

  return Object.entries(colorCategories).map(([category, colors]) => (
    <div key={category} className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{category}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {colors.map(({ name, hex }) => (
          <div key={hex} className="flex flex-col items-center">
            <Button
              className="w-20 h-20 rounded-lg mb-2 transition-colors duration-300 ease-in-out"
              style={{
                backgroundColor: unlockedColors.has(hex) ? hex : "#E5E7EB",
                color: unlockedColors.has(hex)
                  ? getBrightness(hex) > 128
                    ? "black"
                    : "white"
                  : "black",
              }}
              onClick={() => toggleColor(hex)}
            >
              {unlockedColors.has(hex) ? name : "Locked"}
            </Button>
            <span className="text-sm">{name}</span>
            <span className="text-xs text-gray-500">{hex}</span>
          </div>
        ))}
      </div>
    </div>
  ));
}

// Helper function to determine text color based on background brightness
function getBrightness(hex: string): number {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}
