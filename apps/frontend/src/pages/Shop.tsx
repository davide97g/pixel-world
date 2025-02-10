import { useGetShadesForTeam } from "@/api/shades/useGetShadesForTeam";
import { useGetUserVaultForTeam } from "@/api/vault/UseGetUserVaultForTeam";
import { Loader } from "@/components/custom/Loader";
import { useAuth } from "@/context/AuthProvider";
import { getBrightness } from "@/lib/utils";
import { IShade } from "@pixel-world/types";
import { useCallback } from "react";

export default function Shop() {
  const { user } = useAuth();

  const shadesForTeam = useGetShadesForTeam({
    teamId: user?.team_color_id ?? "",
  });
  const vaultForTeam = useGetUserVaultForTeam({
    userId: user?.id,
    teamId: user?.team_color_id ?? "",
  });

  console.log({ shadesForTeam });

  const checkIfShadeIsLocked = useCallback(
    (shade: IShade) => {
      if (!shade.locked) return "locked";

      if (vaultForTeam.data?.find((v) => v.id === shade.id)) return "owned";

      return "unlocked";
    },
    [vaultForTeam.data],
  );

  return (
    <div>
      <h1>Shop</h1>
      {shadesForTeam.isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-row justify-center items-center flex-wrap gap-4">
          {shadesForTeam.data?.map((shade) => (
            <div
              key={shade.id}
              className="text-center flex flex-col items-center justify-center"
              style={{
                backgroundColor: shade.id,
                height: 100,
                width: 100,
                color: getBrightness(shade.id) > 128 ? "black" : "white",
                position: "relative",
                cursor:
                  checkIfShadeIsLocked(shade) === "unlocked"
                    ? "pointer"
                    : undefined,
              }}
            >
              <div
                style={{
                  filter:
                    checkIfShadeIsLocked(shade) !== "unlocked"
                      ? "blur(2px)"
                      : undefined,
                }}
              >
                {shade.name}
              </div>
              {checkIfShadeIsLocked(shade) !== "unlocked" && (
                <div
                  style={{ position: "absolute", top: 0, left: 0, zIndex: 99 }}
                  className="w-full h-full relative flex flex-row items-center justify-center"
                >
                  <div
                    style={{ backgroundColor: "black", color: "white" }}
                    className="w-full"
                  >
                    {checkIfShadeIsLocked(shade) === "locked" && "Locked"}
                    {checkIfShadeIsLocked(shade) === "owned" && "Owned"}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
