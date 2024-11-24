import { Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';
import { Pixel } from './Pixel/Pixel';
import type { IPixel } from './models';

const colors = [
  'red',
  'green',
  'blue',
  'yellow',
  'purple',
  'pink',
  'orange',
  'indigo',
  'teal',
  'cyan',
];

const freePixels = [
  1, 5, 8, 14, 15, 29, 31, 36, 37, 41, 45, 49, 50, 52, 58, 59, 61, 64, 65, 78,
  79, 81, 82, 83, 87, 89, 91, 94, 99,
];

const generateRandomColor = () =>
  colors[Math.floor(Math.random() * colors.length)];

const mockPixels: IPixel[] = Array.from({ length: 100 }, (_, i) => ({
  id: `pixel-${i + 1}`,
  color: generateRandomColor(),
  free: freePixels.includes(i + 1),
}));

export function PixelMap() {
  const [pixels, setPixels] = useState<IPixel[]>(mockPixels);
  const [color, setColor] = useState<string>('');

  const onPixelClick = (pixel: IPixel) => {
    console.log(`Pixel ${pixel.id} clicked`);
    if (!pixel.free) return;
    setPixels((prevPixels) =>
      prevPixels.map((p) =>
        p.id === pixel.id
          ? {
              ...p,
              color: color || generateRandomColor(),
              free: false,
            }
          : p,
      ),
    );
  };

  return (
    <div className="max-w-[320px] m-auto dark flex flex-col gap-4">
      <Select
        label="Select a color"
        className="max-w-xs dark"
        onChange={(e) => setColor(e.target.value)}
      >
        {colors.map((color) => (
          <SelectItem className="dark" key={color}>
            {color}
          </SelectItem>
        ))}
      </Select>
      <div className="flex flex-wrap justify-center items-center">
        {pixels.map((pixel) => (
          <Pixel
            free={pixel.free}
            key={pixel.id}
            color={pixel.color}
            onClick={() => onPixelClick(pixel)}
          />
        ))}
      </div>
    </div>
  );
}
