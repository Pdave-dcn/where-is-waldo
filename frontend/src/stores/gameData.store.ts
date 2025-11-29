import type { ImageData } from "@/zodSchemas/image.zod";
import { create } from "zustand";

interface GameDataState {
  aspectRatio: number;
  availableCharacterNames: string[];
  totalCharacters: number;
  isErrorFetchingImageData: boolean;
  selectedImageId: string | null;

  selectImage: (id: string | null) => void;
  selectedImageData: ImageData | null | undefined;
  setSelectedImageData: (data: ImageData | null) => void;
  setIsErrorFetchingImageData: (isError: boolean) => void;

  reset: () => void;
}

/**
 * Game state store for managing selected images and their character data.
 * Tracks the currently selected image, its metadata (dimensions, aspect ratio),
 * and available characters within the image for gameplay.
 */
export const useGameDataStore = create<GameDataState>((set) => ({
  selectedImageId: null,
  selectedImageData: null,
  isErrorFetchingImageData: false,
  aspectRatio: 0,
  availableCharacterNames: [],
  totalCharacters: 0,

  selectImage: (id) => set({ selectedImageId: id }),

  setSelectedImageData: (data) => {
    const aspectRatio =
      data?.originalWidth && data?.originalHeight
        ? data.originalWidth / data.originalHeight
        : 0;

    const availableCharacterNames = data
      ? data.characterLocations.map((char) => char.characterName)
      : [];

    const totalCharacters = availableCharacterNames.length;

    set({
      selectedImageData: data,
      aspectRatio,
      availableCharacterNames,
      totalCharacters,
    });
  },

  setIsErrorFetchingImageData: (isError) =>
    set({ isErrorFetchingImageData: isError }),

  reset: () =>
    set({
      selectedImageId: null,
      selectedImageData: null,
      isErrorFetchingImageData: false,
      aspectRatio: 0,
      availableCharacterNames: [],
      totalCharacters: 0,
    }),
}));
