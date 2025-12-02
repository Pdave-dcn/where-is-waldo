import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface BoxPosition {
  x: number;
  y: number;
}

interface GameUIState {
  boxPosition: BoxPosition | null;
  showInfoModal: boolean;

  setBoxPosition: (position: BoxPosition | null) => void;
  setShowInfoModal: (show: boolean) => void;

  reset: () => void;
}

/**
 * Game UI store for managing interactive overlay elements.
 * Controls the character selection dropdown (position and visibility)
 * and info modal state during gameplay.
 */
export const useGameUIStore = create<GameUIState>()(
  devtools(
    (set) => ({
      boxPosition: null,
      showBox: false,
      showInfoModal: false,

      setBoxPosition: (position) =>
        set({ boxPosition: position }, false, "UI/setBoxPosition"),

      setShowInfoModal: (show) =>
        set({ showInfoModal: show }, false, "UI/setShowInfoModal"),

      reset: () =>
        set(
          {
            boxPosition: null,
            showInfoModal: false,
          },
          false,
          "UI/reset"
        ),
    }),
    { name: "GameUI" }
  )
);
