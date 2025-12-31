import { Request, Response, NextFunction } from "express";
import prisma from "../core/config/db.js";
import { createLogger } from "../core/config/logger.js";
import { ImageIdParamSchema } from "../zodSchemas/image.zod.js";
import createActionLogger from "../utils/logger.util.js";

const controllerLogger = createLogger({ module: "LeaderboardController" });

export const getLeaderboardForImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const actionLogger = createActionLogger(
    controllerLogger,
    "getLeaderboardForImage",
    req
  );
  try {
    actionLogger.info("Fetching leaderboard for image");

    const { id: imageId } = ImageIdParamSchema.parse(req.params);
    actionLogger.info(`Validated image ID: ${imageId}`);

    actionLogger.debug(`Looking up image with ID: ${imageId}`);
    const image = await prisma.image.findUnique({
      where: { id: imageId },
    });
    if (!image) {
      actionLogger.warn(`Image with ID: ${imageId} not found`);
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
    actionLogger.info("Leaderboard retrieved successfully");

    res.status(200).json({
      message: "Leaderboard retrieved successfully",
      data: leaderboard,
    });
  } catch (error: unknown) {
    return next(error);
  }
};
