import { Request, Response } from "express";
import prisma from "../core/config/db.js";
import { CharacterLocationSchema } from "../zodSchemas/location.zod.js";
import { ImageIdParamSchema } from "../zodSchemas/image.zod.js";
import handleError from "../core/error/index.js";

export const addCharacterLocation = async (req: Request, res: Response) => {
  try {
    const { id: imageId } = ImageIdParamSchema.parse(req.params);
    const validatedBody = CharacterLocationSchema.parse(req.body);

    const image = await prisma.image.findUnique({
      where: { id: imageId },
    });
    if (!image) {
      return res.status(404).json({ message: "Game image not found." });
    }

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

    res.status(201).json({
      message: "Character location added successfully",
      data: location,
    });
  } catch (error: unknown) {
    return handleError(error, res);
  }
};
