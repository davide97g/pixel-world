import { useAddVote } from "@/api";
import { useGetTeams } from "@/api/teams/useGetTeams";
import { useGetUserVaultForTeam } from "@/api/vault/UseGetUserVaultForTeam";
import { useGetVotes } from "@/api/votes/useGetVotes";
import { Loader } from "@/components/custom/Loader";
import { ModalStepper } from "@/components/custom/ModalStepper";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/hooks/useToast";
import { useState } from "react";

export default function Challenge() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedShade, setSelectedShade] = useState<string>("");

  const { user } = useAuth();
  const { toast } = useToast();

  const getVotes = useGetVotes();
  const getTeams = useGetTeams();
  const getVaultForTeam = useGetUserVaultForTeam({
    userId: user?.id,
    teamId: selectedTeam,
  });
  const addVote = useAddVote();
  console.log({ getTeams: getTeams.data });

  const getTeamColorName = (teamId: string) => {
    return getTeams.data?.find((team) => team.id === teamId)?.name ?? "Unknown";
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Color Voting Grid</h1>

      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-4">
          {getVotes.data?.totals?.map((t) => (
            <div key={t.team_id}>
              {getTeamColorName(t.team_id)}: {t.total}
            </div>
          ))}
        </div>
        <Button
          onClick={() => getVotes.refetch()}
          disabled={getVotes.isFetching}
        >
          {getVotes.isFetching ? "Refreshing..." : "Refresh"}
        </Button>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="grid grid-cols-5 gap-4">
          {getVotes.data?.votes.map((vote) => (
            <div
              key={vote.created_at}
              className="flex-col gap-2 aspect-square rounded-lg shadow-md flex items-center justify-center"
            >
              <div
                style={{
                  backgroundColor: vote.shade_id,
                  height: 100,
                  width: 100,
                  borderRadius: "0.5rem",
                }}
              ></div>
              <span className="bg-white bg-opacity-75 px-2 py-1 rounded text-xs">
                {vote.user_id}
              </span>
            </div>
          ))}
        </div>
        <Button onClick={() => setIsOpen(true)}>Vote</Button>
        <ModalStepper
          open={isOpen}
          onClose={() => setIsOpen(false)}
          steps={["Select team", "Select Shades"]}
          handleNext={() => setCurrentStep((prev) => prev + 1)}
          handlePrevious={() => setCurrentStep((prev) => prev - 1)}
          currentStep={currentStep}
          title="Vote for a team"
          isNextDisabled={!selectedTeam}
          onConfirm={() => {
            addVote
              .mutateAsync({
                teamId: selectedTeam,
                shadeId: selectedShade,
              })
              .then(() => {
                setIsOpen(false);
                getVotes.refetch();
                toast({
                  variant: "default",
                  title: "Vote added successfully",
                });
              });
          }}
        >
          {currentStep === 0 && (
            <div className="flex flex-row items-center justify-center gap-4 p-4">
              {getTeams.data?.map((team) => (
                <div
                  key={team.id}
                  className="flex flex-col items-center gap-2"
                  onClick={() => setSelectedTeam(team.id)}
                  style={{
                    cursor: "pointer",
                    border:
                      selectedTeam === team.id ? "2px solid black" : "none",
                    padding: "1rem",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: team.id,
                      width: "70px",
                      height: "70px",
                    }}
                  />
                  <div key={team.id}>{team.name}</div>
                </div>
              ))}
            </div>
          )}
          {currentStep === 1 &&
            (getVaultForTeam.isLoading ? (
              <Loader />
            ) : (
              <div className="flex flex-row items-center justify-center gap-4 p-4">
                {getVaultForTeam.data?.map((shade) => (
                  <div
                    key={shade.id}
                    className="flex flex-col items-center gap-2"
                    style={{
                      cursor: "pointer",
                      border:
                        selectedShade === shade.id ? "2px solid black" : "none",
                      padding: "1rem",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: shade.id,
                        width: "100px",
                        height: "100px",
                        color: "white",
                      }}
                      className="flex flex-row justify-center items-center"
                      onClick={() => setSelectedShade(shade.id)}
                    >
                      {shade.id}
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </ModalStepper>
      </div>
    </div>
  );
}
