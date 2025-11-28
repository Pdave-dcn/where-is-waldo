import type { ImageData } from "@/zodSchemas/image.zod";
import { create } from "zustand";

interface GameDataState {
  selectImage: (id: string | null) => void;
  selectedImageId: string | null;
  selectedImageData: ImageData | null | undefined;
  setSelectedImageData: (data: ImageData | null) => void;
}

export const useGameDataStore = create<GameDataState>((set) => ({
  selectedImageId: null,
  selectedImageData: null,
  selectImage: (id) => set({ selectedImageId: id }),
  setSelectedImageData: (data) => set({ selectedImageData: data }),
}));
