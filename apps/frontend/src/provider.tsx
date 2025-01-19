import { HeroUIProvider } from "@heroui/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useHref, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

const queryClient = new QueryClient();

export function Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
