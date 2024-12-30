export interface IColor {
  value: string;
  rgb: [number, number, number];
  name?: string;
  hsl?: [number, number, number];
  density: number;
  isLight: boolean;
}
