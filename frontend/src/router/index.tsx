import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Create = lazy(() => import('../pages/Create'));
const Login = lazy(() => import('../pages/Login'));
const PersonalArea = lazy(() => import('../pages/PersonalArea'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense>
        <Create />
      </Suspense>
    ),
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: '/login',
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/me',
    element: (
      <Suspense>
        <PersonalArea />
      </Suspense>
    ),
  },
]);
