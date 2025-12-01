import type { ImageData } from "@/zodSchemas/image.zod";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

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
export const useGameDataStore = create<GameDataState>()(
  devtools((set) => ({
    selectedImageId: null,
    selectedImageData: null,
    isErrorFetchingImageData: false,
    aspectRatio: 0,
    availableCharacterNames: [],
    totalCharacters: 0,

    selectImage: (id) =>
      set({ selectedImageId: id }, false, "GameData/selectImage"),

    setSelectedImageData: (data) => {
      const aspectRatio =
        data?.originalWidth && data?.originalHeight
          ? data.originalWidth / data.originalHeight
          : 0;

      const availableCharacterNames = data
        ? data.characterLocations.map((char) => char.characterName)
        : [];

      const totalCharacters = availableCharacterNames.length;

      set(
        {
          selectedImageData: data,
          aspectRatio,
          availableCharacterNames,
          totalCharacters,
        },
        false,
        "GameData/setSelectedImageData"
      );
    },

    setIsErrorFetchingImageData: (isError) =>
      set(
        { isErrorFetchingImageData: isError },
        false,
        "GameData/setIsErrorFetchingImageData"
      ),
    reset: () =>
      set(
        {
          selectedImageId: null,
          selectedImageData: null,
          isErrorFetchingImageData: false,
          aspectRatio: 0,
          availableCharacterNames: [],
          totalCharacters: 0,
        },
        false,
        "GameData/reset"
      ),
  }))
);
