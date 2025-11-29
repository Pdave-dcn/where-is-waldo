import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface BoxPosition {
  x: number;
  y: number;
}

interface GameUIStore {
  boxPosition: BoxPosition | null;
  showDropdown: boolean;
  showInfoModal: boolean;

  setBoxPosition: (position: BoxPosition | null) => void;
  setShowDropdown: (show: boolean) => void;
  setShowInfoModal: (show: boolean) => void;

  openDropdownAt: (x: number, y: number) => void;
  closeDropdown: () => void;
  reset: () => void;
}

export const useGameUIStore = create<GameUIStore>()(
  devtools(
    (set) => ({
      boxPosition: null,
      showDropdown: false,
      showInfoModal: false,

      setBoxPosition: (position) => set({ boxPosition: position }),
      setShowDropdown: (show) => set({ showDropdown: show }),
      setShowInfoModal: (show) => set({ showInfoModal: show }),

      openDropdownAt: (x, y) =>
        set({
          boxPosition: { x, y },
          showDropdown: true,
        }),

      closeDropdown: () =>
        set({
          boxPosition: null,
          showDropdown: false,
        }),

      reset: () =>
        set({
          boxPosition: null,
          showDropdown: false,
          showInfoModal: false,
        }),
    }),
    { name: "GameUI" }
  )
);
