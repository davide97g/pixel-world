import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("./pages/Login"));
const PersonalArea = lazy(() => import("./pages/PersonalArea"));

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <Suspense>
            <PersonalArea />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense>
            <Login />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
