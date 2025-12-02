import { z } from "zod";
import { CharacterLocationSchema } from "./character.zod";

const ImageDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  url: z.string().url(),
  originalWidth: z.number().int().positive(),
  originalHeight: z.number().int().positive(),
  characterLocations: z.array(CharacterLocationSchema),
});

const ImageResponseSchema = z.object({
  message: z.string(),
  data: ImageDataSchema,
});

const AvailableImageSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string().url(),
  description: z.string(),
});

const AllImagesResponseSchema = z.object({
  message: z.string(),
  data: z.array(AvailableImageSchema),
});

export type GameImage = z.infer<typeof AvailableImageSchema>;
export type ImageData = z.infer<typeof ImageDataSchema>;

export {
  ImageDataSchema,
  ImageResponseSchema,
  AvailableImageSchema,
  AllImagesResponseSchema,
};
