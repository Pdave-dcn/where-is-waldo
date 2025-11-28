import { z } from "zod";

const LeaderboardSchema = z.object({
  id: z.string(),
  playerName: z.string(),
  timeTakenSeconds: z.number(),
  completedAt: z.string(),
});

const LeaderboardResponseSchema = z.object({
  message: z.string(),
  data: z.array(LeaderboardSchema),
});

export { LeaderboardSchema, LeaderboardResponseSchema };
