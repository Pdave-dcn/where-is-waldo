import { LeaderboardResponseSchema } from "@/zodSchemas/leaderboard.zod";
import api from "./axios";

export const getLeaderboard = async () => {
  try {
    const response = await api.get("/leaderboard");
    const validatedResponse = LeaderboardResponseSchema.parse(response.data);

    return validatedResponse;
  } catch (error: unknown) {
    console.error("Error fetching leaderboard data:", error);
    throw error;
  }
};
