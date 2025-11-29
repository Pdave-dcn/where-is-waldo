import { Request, Response } from "express";
import prisma from "../core/config/db.js";
import handleError from "../core/error/index.js";
import { ImageIdParamSchema } from "../zodSchemas/image.zod.js";
import { GameCompletionSchema } from "../zodSchemas/completion.zod.js";
import { createLogger } from "../core/config/logger.js";
import createActionLogger from "../utils/logger.util.js";

const controllerLogger = createLogger({ module: "GameCompletionController" });

export const createNewGameCompletion = async (req: Request, res: Response) => {
  const actionLogger = createActionLogger(
    controllerLogger,
    "createNewGameCompletion",
    req
  );
  try {
    actionLogger.info("Creating new game completion record");

    const validatedBody = GameCompletionSchema.parse(req.body);
    const { id: imageId } = ImageIdParamSchema.parse(req.params);

    const finalPlayerName = validatedBody.playerName.trim() || "anonymous";
    actionLogger.info("Validated request parameters and body");

    actionLogger.debug(`Looking up image with ID: ${imageId}`);
    const image = await prisma.image.findUnique({
      where: { id: imageId },
    });
    if (!image) {
      actionLogger.warn(`Image with ID: ${imageId} not found`);
      return res.status(404).json({ message: "Game image not found." });
    }

    actionLogger.debug(`Creating game completion for image ID: ${imageId}`);
    const newCompletion = await prisma.gameCompletion.create({
      data: {
        playerName: finalPlayerName,
        timeTakenSeconds: validatedBody.timeTakenSeconds,
        imageId: imageId,
      },
    });
    actionLogger.info("New game completion created successfully");

    res.status(201).json({
      message: "New game completion created successfully",
      data: newCompletion,
    });
  } catch (error: unknown) {
    return handleError(error, res);
  }
};
