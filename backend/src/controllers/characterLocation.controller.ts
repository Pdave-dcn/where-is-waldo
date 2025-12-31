import { Request, Response, NextFunction } from "express";
import prisma from "../core/config/db.js";
import { CharacterLocationSchema } from "../zodSchemas/location.zod.js";
import { ImageIdParamSchema } from "../zodSchemas/image.zod.js";
import { createLogger } from "../core/config/logger.js";
import createActionLogger from "../utils/logger.util.js";

const controllerLogger = createLogger({
  module: "CharacterLocationController",
});

export const addCharacterLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const actionLogger = createActionLogger(
    controllerLogger,
    "addCharacterLocation",
    req
  );
  try {
    actionLogger.info("Adding character location to image");

    const { id: imageId } = ImageIdParamSchema.parse(req.params);
    const validatedBody = CharacterLocationSchema.parse(req.body);
    actionLogger.info("Validated request parameters and body");

    actionLogger.debug(`Looking up image with ID: ${imageId}`);
    const image = await prisma.image.findUnique({
      where: { id: imageId },
    });
    if (!image) {
      actionLogger.warn(`Image with ID: ${imageId} not found`);
      return res.status(404).json({ message: "Game image not found." });
    }

    actionLogger.debug(`Creating character location for image ID: ${imageId}`);
    const location = await prisma.characterLocation.create({
      data: {
        imageId,
        characterName: validatedBody.characterName,
        targetXRatio: validatedBody.targetXRatio,
        targetYRatio: validatedBody.targetYRatio,
        toleranceXRatio: validatedBody.toleranceXRatio,
        toleranceYRatio: validatedBody.toleranceYRatio,
      },
    });

    actionLogger.info("Character location added successfully");

    res.status(201).json({
      message: "Character location added successfully",
      data: location,
    });
  } catch (error: unknown) {
    return next(error);
  }
};
