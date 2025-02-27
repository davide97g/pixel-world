import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";

export default function User() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={() => navigate("/me")}>{user?.email}</Button>
    </div>
  );
}
