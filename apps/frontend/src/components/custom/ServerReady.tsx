import { useAuth } from "@/hooks/useAuth";
import { Loader } from "./Loader";

export function ServerReady({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isServerReady } = useAuth();
  console.log(isServerReady);
  if (!isServerReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Server is not ready yet...</p>
        <Loader />
      </div>
    );
  }
  return children;
}
