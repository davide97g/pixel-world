import { Button, Divider } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import User from "../components/User";

import { AUTH } from "../services/auth";

import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Loader } from "../components/Loader";

import { useAuth } from "../hooks/useAuth";
import { useLayout } from "../hooks/useLayout";
import { useAPI } from "../services/api";

export default function PersonalArea() {
  const { session, user, loading } = useAuth();

  const { isMobile } = useLayout();
  const navigate = useNavigate();
  const { getUser } = useAPI();

  useEffect(() => {
    if (!session) navigate("/login");
  }, [session, navigate]);

  const handleLogout = async () => {
    AUTH.logout().then(() => navigate("/"));
  };

  console.info({ user });

  const testGetByUser = () => {
    getUser().then((res) => {
      console.info({ res });
    });
  };

  return (
    <div className="w-full sm:w-6/12 flex flex-col justify-center items-center gap-4 px-10">
      {loading && <Loader />}
      <div className="pt-28 md:pt-20 flex flex-col items-center">
        <h1 className="text-2xl">Personal Area</h1>
        <br />
        <p>{user?.email}</p>
      </div>
      <Button
        isIconOnly={isMobile}
        size={isMobile ? "sm" : "md"}
        className="text-xs sm:text-sm absolute top-2 left-2 sm:top-4 sm:left-4"
        onPress={() => navigate("/")}
        variant="ghost"
        startContent={<ArrowLeft />}
      >
        {isMobile ? "" : "Home"}
      </Button>
      <User interactive={false} />
      <Divider className="my-2" />
      <Button
        className="text-xs sm:text-sm"
        onPress={() => testGetByUser()}
        variant="ghost"
      >
        Get User
      </Button>
      <Divider className="my-2" />
      <div className="flex flex-row gap-2 sm:gap-4">
        <Button
          color="danger"
          onPress={handleLogout}
          size={isMobile ? "sm" : "md"}
          className="text-xs sm:text-sm"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
