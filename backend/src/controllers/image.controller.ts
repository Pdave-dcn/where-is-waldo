import { Request, Response } from "express";
import prisma from "../config/db.js";
import { z } from "zod";

const NewImageSchema = z.object({
  name: z.string().min(1, "Name is required."),
  imageUrl: z.string().url("Image URL must be a valid URL."),
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

    const newImage = await prisma.gameImage.create({
      data: validatedBody,
    });

    res.status(201).json({
      message: "Image added successfully",
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
    const imageId = req.params.id;
    if (
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        imageId
      )
    ) {
      return res.status(400).json({ message: "Invalid image ID format." });
    }

    const image = await prisma.gameImage.findUnique({
      where: { id: imageId },
      include: {
        characterLocations: true,
      },
    });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({
      message: "Image found successfully",
      image,
    });
  } catch (error) {
    console.error("Error getting image:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
