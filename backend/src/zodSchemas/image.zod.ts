import { z } from "zod";

export const ImageIdParamSchema = z.object({
  id: z.string().uuid("Invalid Image ID format in URL parameter."),
});

export const NewImageSchema = z.object({
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
