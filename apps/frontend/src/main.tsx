import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ServerReady } from "./components/custom/ServerReady";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./context/AuthProvider";
import "./index.css";
import { router } from "./router";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ServerReady>
          <RouterProvider router={router} />
          <Toaster />
        </ServerReady>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
