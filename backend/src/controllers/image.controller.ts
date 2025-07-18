import { Request, Response } from "express";
import prisma from "../config/db.js";
import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

const ImageIdParamSchema = z.object({
  id: z.string().uuid("Invalid Image ID format in URL parameter."),
});

const NewImageSchema = z.object({
  name: z.string().min(1, "Name is required."),
  imageUrl: z
    .string()
    .url("Image URL must be a valid URL.")
    .min(1, "Image url is required."),
  description: z.string().min(1, "Description is required."),
  publicId: z.string().min(1, "Cloudinary Public ID is required."),
  originalWidth: z
    .number()
    .int()
    .positive("Original width must be a positive integer."),
  originalHeight: z
    .number()
    .int()
    .positive("Original height must be a positive integer."),
});

export const addNewImage = async (req: Request, res: Response) => {
  try {
    const validatedBody = NewImageSchema.parse(req.body);

    const existingImage = await prisma.gameImage.findUnique({
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

    const newImage = await prisma.gameImage.create({
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
      image: newImage,
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
    console.error("Error in addNewImage:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getImage = async (req: Request, res: Response) => {
  try {
    const { id: imageId } = ImageIdParamSchema.parse(req.params);

    const image = await prisma.gameImage.findUnique({
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
      image: responseImage,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed for request parameters.",
        errors: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
    }
    if (error instanceof PrismaClientKnownRequestError) {
      console.error("Prisma Error fetching image:", error.message);
    }
    console.error("Error getting image:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getAllImages = async (_req: Request, res: Response) => {
  try {
    const images = await prisma.gameImage.findMany({
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
    if (error instanceof PrismaClientKnownRequestError) {
      console.error("Prisma Error fetching image:", error.message);
    }

    console.error("Error getting image:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
