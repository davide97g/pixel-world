import { useGetShades } from "@/api/shades/useGetShades";
import { useAddShadeToVault } from "@/api/vault/useAddShade";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/hooks/useToast";
import { useState } from "react";

export default function HueVault() {
  const shades = useGetShades();
  const addShade = useAddShadeToVault();

  const { user } = useAuth();

  const { toast } = useToast();
  const [selectedShadeId, setSelectedShadeId] = useState<string>();

  const handleAddShade = async () => {
    return addShade
      .mutateAsync({
        shadeId: selectedShadeId ?? "",
        uid: user?.id ?? "",
      })
      .then(() => {
        setSelectedShadeId(undefined);
        toast({
          title: "Shade added to vault",
          description: "You have successfully added a shade to your vault.",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Shades</h2>
      <Button
        className="mb-4"
        onClick={handleAddShade}
        disabled={!selectedShadeId}
      >
        Buy Shade {selectedShadeId}
      </Button>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {shades.data?.map(({ id, name, team_color_id }) => (
          <div key={id} className="flex flex-col items-center">
            <Button
              className="w-20 h-20 rounded-lg mb-2 transition-colors duration-300 ease-in-out text-2xl"
              style={{
                backgroundColor: id,
                color: getBrightness(id) > 128 ? "black" : "white",
                // dropshadow
              }}
              onClick={() => setSelectedShadeId(id)}
            >
              <p
                style={{
                  textShadow: `1px 1px 2px ${
                    getBrightness(id) > 128
                      ? "rgba(0, 0, 0, 0.5)"
                      : "rgba(255, 255, 255, 0.2)"
                  }`,
                }}
              >
                {selectedShadeId === id ? "👍" : ""}
              </p>
            </Button>
            <span className="text-sm">{name}</span>
            <span className="text-xs text-gray-500">{id}</span>
            <span className="text-xs text-gray-500">team: {team_color_id}</span>
          </div>
        ))}
      </div>
    </>
  );
}

// Helper function to determine text color based on background brightness
function getBrightness(hex: string): number {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}
