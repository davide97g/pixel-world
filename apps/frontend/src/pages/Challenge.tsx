import { useGetTeams } from "@/api/useGetTeams";
import { useGetVotes } from "@/api/useGetVotes";
import { Button } from "@/components/ui/button";

export default function Challenge() {
  const getVotes = useGetVotes();
  const getTeams = useGetTeams();

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

      <div className="grid grid-cols-5 gap-4">
        {getVotes.data?.votes.map((vote) => (
          <div
            key={vote.created_at}
            className="aspect-square rounded-lg shadow-md flex items-center justify-center"
            style={{ backgroundColor: vote.color_id }}
          >
            <span className="bg-white bg-opacity-75 px-2 py-1 rounded text-sm">
              {vote.user_id}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
