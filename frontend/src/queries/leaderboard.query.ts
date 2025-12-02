import { getLeaderboard } from "@/api/leaderboard.api";
import { useQuery } from "@tanstack/react-query";

export const useLeaderboardQuery = (imageId: string) => {
  return useQuery({
    queryKey: ["leaderboard", imageId],
    queryFn: () => getLeaderboard(imageId),
  });
};
