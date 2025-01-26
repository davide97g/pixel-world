import { Page } from "@/components/custom/Page";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const PersonalArea = lazy(() => import("../pages/PersonalArea"));
const Vote = lazy(() => import("../pages/Vote"));
const Challenge = lazy(() => import("../pages/Challenge"));
const HueVault = lazy(() => import("../pages/HueVault"));

export const router = createBrowserRouter([
  {
    path: "/huevault",
    element: (
      <Suspense>
        <Page>
          <HueVault />
        </Page>
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense>
        <Page>
          <Register />
        </Page>
      </Suspense>
    ),
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/login",
    element: (
      <Suspense>
        <Page>
          <Login />
        </Page>
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense>
        <Page>
          <Vote />
        </Page>
      </Suspense>
    ),
  },
  {
    path: "/challenge",
    element: (
      <Suspense>
        <Page>
          <Challenge />
        </Page>
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
