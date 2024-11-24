import { Pixel } from './Pixel/Pixel';

export function PixelMap() {
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
  const generateRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  const pixels = Array.from({ length: 100 }, (_, i) => (
    <Pixel key={`pixel-${i + 1}`} color={generateRandomColor()} />
  ));

  return (
    <div className="max-w-[600px] m-auto">
      <div className="flex flex-wrap justify-center items-center gap-0 ">
        {pixels}
      </div>
    </div>
  );
}
