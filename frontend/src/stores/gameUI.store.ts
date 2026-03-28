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

export const useGameUIStore = create<GameUIState>()(
  devtools(
    (set) => ({
      boxPosition: null,
      showBox: false,
      showInfoModal: false,

      setBoxPosition: (position: BoxPosition | null) =>
        set({ boxPosition: position }, false, "UI/setBoxPosition"),

      setShowInfoModal: (show: boolean) =>
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
    process.env.NODE_ENV === "development" ? { name: "GameUI" } : {}
  )
);
