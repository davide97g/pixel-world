import NavMenu from "./NavMenu";

export function Page({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <NavMenu />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
