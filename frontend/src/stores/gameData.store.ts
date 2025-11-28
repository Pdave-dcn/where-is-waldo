import { create } from "zustand";

interface GameDataState {
  selectedImageId: string | null;
  selectImage: (id: string | null) => void;
}

export const useGameDataStore = create<GameDataState>((set) => ({
  selectedImageId: null,
  selectImage: (id) => set({ selectedImageId: id }),
}));
