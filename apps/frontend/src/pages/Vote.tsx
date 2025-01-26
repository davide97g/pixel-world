import { useGetUserColors } from "@/api/user/useGetUserColors";
import { useAddVote } from "@/api/votes/useAddVote";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";

export default function Vote() {
  const { user, loading } = useAuth();
  const addVote = useAddVote();
  const listOfColors = useGetUserColors();

  const [selectedColorId, setSelectedColorId] = useState<string>();

  const handleVote = async () => {
    if (!user) return;

    console.info(user);

    return addVote
      .mutateAsync({
        teamId: user?.team_color_id ?? "",
        colorId: selectedColorId ?? "",
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
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Color Selector</h1>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {listOfColors.data?.map((color) => (
                <button
                  key={color.id}
                  className={`w-full h-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    selectedColorId === color.id
                      ? "ring-2 ring-offset-2 ring-black"
                      : ""
                  }`}
                  style={{ backgroundColor: color.id }}
                  onClick={() => setSelectedColorId(color.id)}
                  aria-label={`Select ${color.name}`}
                  aria-pressed={selectedColorId === color.id}
                />
              ))}
            </div>
            {selectedColorId && (
              <div className="mt-4">
                <p className="text-lg">
                  Selected color:{" "}
                  <span className="font-semibold">
                    {
                      listOfColors.data?.find((c) => c.id === selectedColorId)
                        ?.name
                    }
                  </span>
                </p>
                <div
                  className="w-full h-20 mt-2 rounded-lg"
                  style={{ backgroundColor: selectedColorId }}
                  aria-label={`Selected color: ${listOfColors.data?.find((c) => c.id === selectedColorId)?.name}`}
                />
              </div>
            )}
          </div>
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
            <Button onClick={handleVote} disabled={loading} className="w-full">
              {loading ? "Voting..." : "Vote"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
