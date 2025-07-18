import { Request, Response } from "express";
import prisma from "../config/db.js";
import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

const CharacterLocationSchema = z.object({
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

const ImageIdParamSchema = z.object({
  id: z.string().uuid("Invalid Image ID format in URL parameter."),
});

export const addCharacterLocation = async (req: Request, res: Response) => {
  try {
    const { id: imageId } = ImageIdParamSchema.parse(req.params);

    const validatedBody = CharacterLocationSchema.parse(req.body);

    const image = await prisma.gameImage.findUnique({
      where: { id: imageId },
    });
    if (!image) {
      return res.status(404).json({ message: "Game image not found." });
    }

    const location = await prisma.characterLocation.create({
      data: {
        gameImageId: imageId,
        characterName: validatedBody.characterName,
        targetXRatio: validatedBody.targetXRatio,
        targetYRatio: validatedBody.targetYRatio,
        toleranceXRatio: validatedBody.toleranceXRatio,
        toleranceYRatio: validatedBody.toleranceYRatio,
      },
    });

    res.status(201).json({
      message: "Character location added successfully",
      location,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
    }

    if (error instanceof PrismaClientKnownRequestError) {
      // Handle Prisma unique constraint violation (e.g., trying to add "Waldo" twice to the same image)
      if (error.code === "P2002") {
        const conflictingCharacterName = req.body?.characterName;
        return res.status(409).json({
          message: conflictingCharacterName
            ? `A character with the name '${conflictingCharacterName}' already exists for this image.`
            : `A character location with this unique identifier already exists.`,
        });
      }
    }

    console.error("Error adding character location:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
