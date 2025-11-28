import { z } from "zod";

export const CharacterLocationSchema = z.object({
  id: z.string(),
  characterName: z.string(),
  targetXRatio: z.number(),
  targetYRatio: z.number(),
  toleranceXRatio: z.number(),
  toleranceYRatio: z.number(),
});
