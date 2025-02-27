import { useEffect } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useAuth } from "@/context/AuthProvider";
import { AuthenticationService } from "../services/AuthenticationService";

export default function PersonalArea() {
  const { session, user, loading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!session) navigate("/login");
  }, [session, navigate]);

  const handleLogout = async () => {
    AuthenticationService.logout()
      .then(() => navigate("/login"))
      .catch(console.error);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Personal Area</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Your Email</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-semibold">Your Color ID</h2>
                <p className="text-gray-600">{user?.color_hex_id}</p>
              </div>
              <div
                className="w-12 h-12 rounded-full"
                style={{ backgroundColor: user?.color_hex_id }}
              ></div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-semibold">Your Team ID</h2>
                <p className="text-gray-600">{user?.team_color_id}</p>
              </div>
              <div
                className="w-12 h-12 rounded-full"
                style={{ backgroundColor: user?.team_color_id }}
              ></div>
            </div>
            <Button
              onClick={handleLogout}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
