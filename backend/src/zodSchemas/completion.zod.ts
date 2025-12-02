import { z } from "zod";

export const GameCompletionSchema = z.object({
  playerName: z.string(),
  timeTakenSeconds: z
    .number()
    .positive("Time taken must be a positive number."),
});
