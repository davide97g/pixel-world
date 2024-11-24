export function Pixel({ color }: Readonly<{ color: string }>) {
  return (
    <div
      style={{
        width: '1rem',
        height: '1rem',
        backgroundColor: color,
      }}
    />
  );
}
