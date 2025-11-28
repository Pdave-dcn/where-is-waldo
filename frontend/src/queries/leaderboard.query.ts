import { getLeaderboard } from "@/api/leaderboard.api";
import { useQuery } from "@tanstack/react-query";

export const useLeaderboardQuery = () => {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboard,
  });
};
