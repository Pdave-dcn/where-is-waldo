import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type GameStatus = "IDLE" | "RUNNING" | "PAUSED" | "ENDED";

interface GameStatusStore {
  status: GameStatus;

  // Pure state mutations only
  setStatus: (status: GameStatus) => void;

  // Computed helpers (no side effects)
  isIdle: () => boolean;
  isRunning: () => boolean;
  isPaused: () => boolean;
  isEnded: () => boolean;
  isActive: () => boolean;
}

export const useGameStatusStore = create<GameStatusStore>()(
  devtools(
    (set, get) => ({
      status: "IDLE",

      setStatus: (status) => set({ status }),

      // Read-only computed values
      isIdle: () => get().status === "IDLE",
      isRunning: () => get().status === "RUNNING",
      isPaused: () => get().status === "PAUSED",
      isEnded: () => get().status === "ENDED",
      isActive: () => {
        const s = get().status;
        return s === "RUNNING" || s === "PAUSED";
      },
    }),
    { name: "GameStatus" }
  )
);
