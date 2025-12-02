import { LeaderboardResponseSchema } from "@/zodSchemas/leaderboard.zod";
import api from "./axios";

export const getLeaderboard = async (imageId: string) => {
  try {
    const response = await api.get(`/image/${imageId}/leaderboard`);
    const validatedResponse = LeaderboardResponseSchema.parse(response.data);

    return validatedResponse.data;
  } catch (error: unknown) {
    console.error("Error fetching leaderboard data:", error);
    throw error;
  }
};
