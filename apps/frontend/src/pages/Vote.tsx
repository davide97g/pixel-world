import { useGetUserColors } from "@/api/user/useGetUserColors";
import { useAddVote } from "@/api/votes/useAddVote";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Vote() {
  const { user, loading } = useAuth();
  const addVote = useAddVote();
  const listOfColors = useGetUserColors();

  const navigate = useNavigate();
  const [selectedShadeId, setSelectedShadeId] = useState<string>();

  const handleVote = async () => {
    if (!user) return;

    console.info(user);

    return addVote
      .mutateAsync({
        teamId: user?.team_color_id ?? "",
        shadeId: selectedShadeId ?? "",
      })
      .then((res) => {
        console.log("Success", res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Vote</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Button
              className="col-span-3 w-full"
              onClick={() => navigate("/shades")}
            >
              Add colors
            </Button>
            <p className="text-sm pb-2">
              Choose a color from the list below to vote for your team.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {listOfColors.data?.map((color) => (
                <button
                  key={color.id}
                  className={`w-full h-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    selectedShadeId === color.id
                      ? "ring-2 ring-offset-2 ring-black"
                      : ""
                  }`}
                  style={{ backgroundColor: color.id }}
                  onClick={() => setSelectedShadeId(color.id)}
                  aria-label={`Select ${color.name}`}
                  aria-pressed={selectedShadeId === color.id}
                />
              ))}
              {listOfColors.data?.length === 0 && !listOfColors.isFetching && (
                <>
                  <p className="text-gray-600 text-center col-span-3">
                    No colors available
                  </p>
                  <Button
                    className="col-span-3 w-full"
                    onClick={() => navigate("/shades")}
                  >
                    Add colors
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="space-y-6">
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
              onClick={handleVote}
              disabled={loading || !selectedShadeId}
              className="w-full"
            >
              {loading ? "Voting..." : "Vote"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
