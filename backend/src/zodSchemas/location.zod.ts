import { z } from "zod";

export const CharacterLocationSchema = z.object({
  characterName: z.string().min(1, "Character name is required."),
  targetXRatio: z
    .number()
    .min(0, "Target X Ratio must be between 0 and 1.")
    .max(1, "Target X Ratio must be between 0 and 1."),
  targetYRatio: z
    .number()
    .min(0, "Target Y Ratio must be between 0 and 1.")
    .max(1, "Target Y Ratio must be between 0 and 1."),
  toleranceXRatio: z
    .number()
    .min(0, "Tolerance X Ratio must be between 0 and 1.")
    .max(1, "Tolerance X Ratio must be between 0 and 1."),
  toleranceYRatio: z
    .number()
    .min(0, "Tolerance Y Ratio must be between 0 and 1.")
    .max(1, "Tolerance Y Ratio must be between 0 and 1."),
});
