import {
  AllImagesResponseSchema,
  ImageResponseSchema,
} from "@/zodSchemas/image.zod";
import api from "./axios";

const getGameImages = async () => {
  try {
    const response = await api.get("/images");
    const validatedResponse = AllImagesResponseSchema.parse(response.data);
    return validatedResponse.data;
  } catch (error: unknown) {
    console.error("Error fetching game images:", error);
    throw error;
  }
};

const getImageById = async (imageId: string) => {
  try {
    const response = await api.get(`/image/${imageId}`);

    const validatedResponse = ImageResponseSchema.parse(response.data);

    return validatedResponse.data;
  } catch (error) {
    console.error(
      `Error fetching selected image data for ID ${imageId}:`,
      error
    );
    throw error;
  }
};

export { getGameImages, getImageById };
