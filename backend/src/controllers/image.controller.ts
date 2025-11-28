import { Request, Response } from "express";
import prisma from "../core/config/db.js";
import { ImageIdParamSchema, NewImageSchema } from "../zodSchemas/image.zod.js";
import handleError from "../core/error/index.js";
import { createLogger } from "../core/config/logger.js";
import createActionLogger from "../utils/logger.util.js";

const controllerLogger = createLogger({ module: "ImageController" });

export const addNewImage = async (req: Request, res: Response) => {
  const actionLogger = createActionLogger(controllerLogger, "addNewImage", req);
  try {
    actionLogger.info("Adding new game image");

    const validatedBody = NewImageSchema.parse(req.body);
    actionLogger.info("Validated request body");

    actionLogger.debug(
      `Checking for existing image with name: ${validatedBody.name}`
    );
    const existingImage = await prisma.image.findUnique({
      where: { name: validatedBody.name },
    });

    if (existingImage) {
      actionLogger.warn(
        `Image with name: ${validatedBody.name} already exists`
      );
      return res
        .status(409)
        .json({ message: "Image with this name already exists." });
    }

    actionLogger.debug("Verifying Cloudinary URL");
    if (!validatedBody.imageUrl.includes("res.cloudinary.com")) {
      actionLogger.warn("Provided URL does not appear to be a Cloudinary URL.");
      return res.status(400).json({
        message: "Provided URL does not appear to be a Cloudinary URL.",
      });
    }

    actionLogger.debug("Creating new image record in database");
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

    actionLogger.info("New game image added successfully");

    res.status(201).json({
      message: "Game image details saved successfully",
      data: newImage,
    });
  } catch (error: unknown) {
    return handleError(error, res);
  }
};

export const getImage = async (req: Request, res: Response) => {
  const actionLogger = createActionLogger(controllerLogger, "getImage", req);
  try {
    actionLogger.info("Fetching image details");

    const { id: imageId } = ImageIdParamSchema.parse(req.params);
    actionLogger.info("Validated request parameters");

    actionLogger.debug(`Looking up image with ID: ${imageId}`);
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
      actionLogger.warn(`Image with ID: ${imageId} not found`);
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

    actionLogger.info("Image found successfully");

    res.status(200).json({
      message: "Image found successfully",
      data: responseImage,
    });
  } catch (error: unknown) {
    return handleError(error, res);
  }
};

export const getAllImages = async (_req: Request, res: Response) => {
  const actionLogger = createActionLogger(
    controllerLogger,
    "getAllImages",
    _req
  );
  try {
    actionLogger.info("Fetching all images");

    actionLogger.debug("Querying database for all images");
    const images = await prisma.image.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
      },
    });

    actionLogger.info(
      {
        count: images.length,
      },
      "Images found successfully"
    );

    res.status(200).json({
      message: "Images found successfully",
      data: images,
    });
  } catch (error: unknown) {
    return handleError(error, res);
  }
};
