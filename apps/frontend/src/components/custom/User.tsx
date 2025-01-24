import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";

export default function User() {
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={() => navigate("/")}>{user?.email}</Button>
      {isAdmin && <p className="text-sm">Admin</p>}
    </div>
  );
}
