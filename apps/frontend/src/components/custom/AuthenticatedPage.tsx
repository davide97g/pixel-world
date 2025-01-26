import { useAuth } from "@/context/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Loader } from "./Loader";
import NavMenu from "./NavMenu";

export function AuthenticatedPage({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { loading, isLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {loading && <Loader />}
      {!loading && isLogged && (
        <>
          <NavMenu />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </>
      )}
    </div>
  );
}
