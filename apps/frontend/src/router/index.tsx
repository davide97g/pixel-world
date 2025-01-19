import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const PersonalArea = lazy(() => import("../pages/PersonalArea"));

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>404 Not Found</div>,
    element: (
      <Suspense>
        <PersonalArea />
      </Suspense>
    ),
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
    path: "/me",
    element: (
      <Suspense>
        <PersonalArea />
      </Suspense>
    ),
  },
]);
