import { Avatar } from "@heroui/avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function User() {
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();

  console.info(user);
  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar alt={user?.email} size="lg" onClick={() => navigate("/")} />
      <p className="text-md">{user?.email}</p>
      {isAdmin && <p className="text-sm">Admin</p>}
    </div>
  );
}
