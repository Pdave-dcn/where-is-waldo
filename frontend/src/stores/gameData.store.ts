import type { ImageData } from "@/zodSchemas/image.zod";
import { create } from "zustand";

interface GameDataState {
  selectImage: (id: string | null) => void;
  selectedImageId: string | null;
  selectedImageData: ImageData | null | undefined;
  setSelectedImageData: (data: ImageData | null) => void;
  isErrorFetchingImageData: boolean;
  setIsErrorFetchingImageData: (isError: boolean) => void;
  aspectRatio: number;
}

export const useGameDataStore = create<GameDataState>((set) => ({
  selectedImageId: null,
  selectedImageData: null,
  isErrorFetchingImageData: false,
  aspectRatio: 0,

  selectImage: (id) => set({ selectedImageId: id }),

  setSelectedImageData: (data) => {
    const aspectRatio =
      data?.originalWidth && data?.originalHeight
        ? data.originalWidth / data.originalHeight
        : 0;

    set({
      selectedImageData: data,
      aspectRatio,
    });
  },

  setIsErrorFetchingImageData: (isError) =>
    set({ isErrorFetchingImageData: isError }),
}));
