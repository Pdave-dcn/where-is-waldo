import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface BoxPosition {
  x: number;
  y: number;
}

interface GameUIState {
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

/**
 * Game UI store for managing interactive overlay elements.
 * Controls the character selection dropdown (position and visibility)
 * and info modal state during gameplay.
 */
export const useGameUIStore = create<GameUIState>()(
  devtools(
    (set) => ({
      boxPosition: null,
      showDropdown: false,
      showInfoModal: false,

      // Action name as 3rd parameter shows in Redux DevTools
      setBoxPosition: (position) =>
        set({ boxPosition: position }, false, "UI/setBoxPosition"),

      setShowDropdown: (show) =>
        set({ showDropdown: show }, false, "UI/setShowDropdown"),

      setShowInfoModal: (show) =>
        set({ showInfoModal: show }, false, "UI/setShowInfoModal"),

      // Include dynamic data in action names for better debugging
      openDropdownAt: (x, y) =>
        set(
          {
            boxPosition: { x, y },
            showDropdown: true,
          },
          false,
          `UI/openDropdownAt(${Math.round(x)}, ${Math.round(y)})`
        ),

      closeDropdown: () =>
        set(
          {
            boxPosition: null,
            showDropdown: false,
          },
          false,
          "UI/closeDropdown"
        ),

      reset: () =>
        set(
          {
            boxPosition: null,
            showDropdown: false,
            showInfoModal: false,
          },
          false,
          "UI/reset"
        ),
    }),
    { name: "GameUI" }
  )
);
