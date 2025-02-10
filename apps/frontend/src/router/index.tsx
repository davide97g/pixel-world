import { AuthenticatedPage } from "@/components/custom/AuthenticatedPage";
import Shop from "@/pages/Shop";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const PersonalArea = lazy(() => import("../pages/PersonalArea"));
const Challenge = lazy(() => import("../pages/Challenge"));
const Vault = lazy(() => import("../pages/HueVault"));
const Shades = lazy(() => import("../pages/Shades"));

export const router = createBrowserRouter([
  {
    path: "/vault",
    element: (
      <Suspense>
        <AuthenticatedPage>
          <Vault />
        </AuthenticatedPage>
      </Suspense>
    ),
  },
  {
    path: "/shades",
    element: (
      <Suspense>
        <AuthenticatedPage>
          <Shades />
        </AuthenticatedPage>
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense>
        <Register />
      </Suspense>
    ),
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/login",
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense>
        <AuthenticatedPage>
          <PersonalArea />
        </AuthenticatedPage>
      </Suspense>
    ),
  },
  {
    path: "/challenge",
    element: (
      <Suspense>
        <AuthenticatedPage>
          <Challenge />
        </AuthenticatedPage>
      </Suspense>
    ),
  },
  {
    path: "/shop",
    element: (
      <Suspense>
        <AuthenticatedPage>
          <Shop />
        </AuthenticatedPage>
      </Suspense>
    ),
  },
]);
