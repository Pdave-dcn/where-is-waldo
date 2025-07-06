import { createContext } from "react";

export interface AvailableImage {
  id: string;
  name: string;
  imageUrl: string;
}

export interface CharacterLocation {
  id: string;
  characterName: string;
  targetXRatio: number;
  targetYRatio: number;
  toleranceXRatio: number;
  toleranceYRatio: number;
}

export interface ImageData {
  id: string;
  name: string;
  url: string;
  originalWidth: number;
  originalHeight: number;
  characterLocations: CharacterLocation[];
}

export interface GameDataContextType {
  imageData: ImageData | null;

  allAvailableImages: AvailableImage[] | null;
  allImagesLoading: boolean;
  allImagesError: Error | null;

  selectedImageId: string | null;

  selectImage: (imageId: string) => void;
  selectedImageLoading: boolean;
  selectedImageError: Error | null;
}

export const GameDataContext = createContext<GameDataContextType | null>(null);
