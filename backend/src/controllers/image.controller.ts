import { Request, Response } from "express";
import prisma from "../core/config/db.js";
import { ImageIdParamSchema, NewImageSchema } from "../zodSchemas/image.zod.js";
import handleError from "../core/error/index.js";

export const addNewImage = async (req: Request, res: Response) => {
  try {
    const validatedBody = NewImageSchema.parse(req.body);

    const existingImage = await prisma.image.findUnique({
      where: { name: validatedBody.name },
    });
    if (existingImage) {
      return res
        .status(409)
        .json({ message: "Image with this name already exists." });
    }

    if (!validatedBody.imageUrl.includes("res.cloudinary.com")) {
      return res.status(400).json({
        message: "Provided URL does not appear to be a Cloudinary URL.",
      });
    }

    const newImage = await prisma.image.create({
      data: {
        name: validatedBody.name,
        imageUrl: validatedBody.imageUrl,
        description: validatedBody.description,
        publicId: validatedBody.publicId,
        originalWidth: validatedBody.originalWidth,
        originalHeight: validatedBody.originalHeight,
      },
    });

    res.status(201).json({
      message: "Game image details saved successfully",
      data: newImage,
    });
  } catch (error: unknown) {
    return handleError(error, res);
  }
};

export const getImage = async (req: Request, res: Response) => {
  try {
    const { id: imageId } = ImageIdParamSchema.parse(req.params);

    const image = await prisma.image.findUnique({
      where: { id: imageId },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        originalWidth: true,
        originalHeight: true,
        characterLocations: {
          select: {
            id: true,
            characterName: true,
            targetXRatio: true,
            targetYRatio: true,
            toleranceXRatio: true,
            toleranceYRatio: true,
          },
        },
      },
    });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const responseImage = {
      id: image.id,
      name: image.name,
      description: image.description,
      url: image.imageUrl,
      originalWidth: image.originalWidth,
      originalHeight: image.originalHeight,
      characterLocations: image.characterLocations,
    };

    res.status(200).json({
      message: "Image found successfully",
      data: responseImage,
    });
  } catch (error: unknown) {
    return handleError(error, res);
  }
};

export const getAllImages = async (_req: Request, res: Response) => {
  try {
    const images = await prisma.image.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
      },
    });

    res.status(200).json({
      message: "Images found successfully",
      images,
    });
  } catch (error: unknown) {
    return handleError(error, res);
  }
};
