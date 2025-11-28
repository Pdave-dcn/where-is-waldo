import { Request, Response } from "express";
import prisma from "../core/config/db.js";
import handleError from "../core/error/index.js";
import { ImageIdParamSchema } from "../zodSchemas/image.zod.js";
import { GameCompletionSchema } from "../zodSchemas/completion.zod.js";

export const createNewGameCompletion = async (req: Request, res: Response) => {
  try {
    const validatedBody = GameCompletionSchema.parse(req.body);
    const { id: imageId } = ImageIdParamSchema.parse(req.params);

    const finalPlayerName = validatedBody.playerName.trim() || "anonymous";

    const image = await prisma.image.findUnique({
      where: { id: imageId },
    });
    if (!image) {
      return res.status(404).json({ message: "Game image not found." });
    }

    const newCompletion = await prisma.gameCompletion.create({
      data: {
        playerName: finalPlayerName,
        timeTakenSeconds: validatedBody.timeTakenSeconds,
        imageId: imageId,
      },
    });

    res.status(201).json({
      message: "New game completion created successfully",
      data: newCompletion,
    });
  } catch (error: unknown) {
    return handleError(error, res);
  }
};

export const getLeaderboardForImage = async (req: Request, res: Response) => {
  try {
    const { id: imageId } = ImageIdParamSchema.parse(req.params);

    const image = await prisma.image.findUnique({
      where: { id: imageId },
    });
    if (!image) {
      return res.status(404).json({ message: "Game image not found." });
    }

    const leaderboard = await prisma.gameCompletion.findMany({
      where: { imageId },
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
      data: leaderboard,
    });
  } catch (error: unknown) {
    return handleError(error, res);
  }
};
