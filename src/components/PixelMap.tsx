export function PixelMap() {
  return (
    <div>
      <div className="flex flex-wrap gap-0">
        {Array(100)
          .fill(0)
          .map((_, i) => (
            <div
              key={`${i + 1}`}
              className="w-1/10 h-1/10 border border-gray-300"
            >
              {i + 1}
            </div>
          ))}
      </div>
    </div>
  );
}
