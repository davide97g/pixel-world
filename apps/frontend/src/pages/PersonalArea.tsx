import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { useNavigate } from "react-router-dom";
import User from "../components/User";

import { AUTH } from "../services/auth";

import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Loader } from "../components/Loader";

import { useAuth } from "../hooks/useAuth";
import { useLayout } from "../hooks/useLayout";

export default function PersonalArea() {
  const { session, loading } = useAuth();

  const { isMobile } = useLayout();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) navigate("/login");
  }, [session, navigate]);

  const handleLogout = async () => {
    AUTH.logout().then(() => navigate("/"));
  };

  return (
    <div className="w-full sm:w-6/12 flex flex-col justify-center items-center gap-4 px-10">
      {loading && <Loader />}
      <div className="pt-28 md:pt-20 flex flex-col items-center gap-2">
        <img src="src/assets/logo.png" alt="logo" height="150" width="150" />
        <h1 className="text-2xl">Personal Area</h1>
      </div>
      <Button
        isIconOnly={isMobile}
        size={isMobile ? "sm" : "md"}
        className="text-xs sm:text-sm absolute top-2 left-2 sm:top-4 sm:left-4"
        onClick={() => navigate("/")}
        variant="ghost"
        startContent={<ArrowLeft />}
      >
        {isMobile ? "" : "Home"}
      </Button>
      <User />
      <Divider className="my-2" />
      <div className="flex flex-row gap-2 sm:gap-4">
        <Button
          color="danger"
          onClick={handleLogout}
          size={isMobile ? "sm" : "md"}
          className="text-xs sm:text-sm"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
