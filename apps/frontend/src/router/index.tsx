import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const PersonalArea = lazy(() => import("../pages/PersonalArea"));

export const router = createBrowserRouter([
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
        <PersonalArea />
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
