export function Pixel({
  color,
  free,
  onClick,
}: Readonly<{ color: string; free: boolean; onClick: () => void }>) {
  return (
    <div
      style={{
        width: '2rem',
        height: '2rem',
        backgroundColor: free ? 'transparent' : color,
        cursor: free ? 'pointer' : 'default',
      }}
      onClick={onClick}
    />
  );
}
