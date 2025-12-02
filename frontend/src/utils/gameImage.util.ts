import type { ImageData } from "@/zodSchemas/image.zod";
import { toast } from "sonner";

interface Position {
  x: number;
  y: number;
}

export interface CharacterData {
  characterName: string;
  position: Position;
  tolerance: Position;
}

export const scaleCharacterPositions = (
  imageData: ImageData,
  displayedWidth: number,
  displayedHeight: number
): CharacterData[] => {
  const scaleX = displayedWidth / imageData.originalWidth;
  const scaleY = displayedHeight / imageData.originalHeight;

  return imageData.characterLocations.map((char) => ({
    characterName: char.characterName,
    position: {
      x: char.targetXRatio * imageData.originalWidth * scaleX,
      y: char.targetYRatio * imageData.originalHeight * scaleY,
    },
    tolerance: {
      x: char.toleranceXRatio * imageData.originalWidth * scaleX,
      y: char.toleranceYRatio * imageData.originalHeight * scaleY,
    },
  }));
};

export const validateImageData = (imageData: ImageData): boolean => {
  if (!imageData?.characterLocations?.length) {
    console.error("Missing character data");
    toast.error("Game Setup Error", {
      description: "Critical character data is missing for this image.",
      duration: 5000,
    });
    return false;
  }
  return true;
};

export const preloadImageBinary = (url: string) => {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.src = url;
  });
};
