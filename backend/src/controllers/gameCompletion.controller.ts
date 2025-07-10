import { Request, Response } from "express";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import prisma from "../config/db.js";

const ImageIdParamSchema = z.object({
  id: z.string().uuid("Invalid Image ID format in URL parameter."),
});

const GameCompletionSchema = z.object({
  playerName: z.string(),
  timeTakenSeconds: z
    .number()
    .positive("Time taken must be a positive number."),
});

export const createNewGameCompletion = async (req: Request, res: Response) => {
  try {
    const validatedBody = GameCompletionSchema.parse(req.body);

    const { id: imageId } = ImageIdParamSchema.parse(req.params);

    const finalPlayerName = validatedBody.playerName.trim() || "anonymous";

    const image = await prisma.gameImage.findUnique({
      where: { id: imageId },
    });
    if (!image) {
      return res.status(404).json({ message: "Game image not found." });
    }

    const newCompletion = await prisma.gameCompletion.create({
      data: {
        playerName: finalPlayerName,
        timeTakenSeconds: validatedBody.timeTakenSeconds,
        gameImageId: imageId,
      },
    });

    res.status(201).json({
      message: "New game completion created successfully",
      newCompletion,
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

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // P2003: Foreign key constraint failed (e.g., if gameImageId somehow invalid after check)
      if (error.code === "P2003") {
        return res
          .status(400)
          .json({ message: "Invalid game image ID provided." });
      }
      console.error("Prisma Client Known Request Error:", error);
    }

    console.error("Error creating new game completion:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getLeaderboardForImage = async (req: Request, res: Response) => {
  try {
    const { id: imageId } = ImageIdParamSchema.parse(req.params);

    const image = await prisma.gameImage.findUnique({
      where: { id: imageId },
    });
    if (!image) {
      return res.status(404).json({ message: "Game image not found." });
    }

    const leaderboard = await prisma.gameCompletion.findMany({
      where: { gameImageId: imageId },
      select: {
        id: true,
        playerName: true,
        timeTakenSeconds: true,
        completedAt: true,
      },
      orderBy: {
        timeTakenSeconds: "asc",
      },
      take: 10,
    });

    res.status(200).json({
      message: "Leaderboard retrieved successfully",
      leaderboard,
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

    console.error("Error retrieving game completions:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
