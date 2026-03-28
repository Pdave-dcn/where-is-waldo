import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type GameStatus = "IDLE" | "RUNNING" | "PAUSED" | "ENDED";

interface GameStatusState {
  status: GameStatus;

  setStatus: (status: GameStatus) => void;

  isIdle: () => boolean;
  isRunning: () => boolean;
  isPaused: () => boolean;
  isEnded: () => boolean;
  isActive: () => boolean;
}

export const useGameStatusStore = create<GameStatusState>()(
  devtools(
    (set, get) => ({
      status: "IDLE",

      setStatus: (status: GameStatus) =>
        set({ status }, false, `Status/setStatus: ${status}`),

      isIdle: () => get().status === "IDLE",
      isRunning: () => get().status === "RUNNING",
      isPaused: () => get().status === "PAUSED",
      isEnded: () => get().status === "ENDED",
      isActive: () => {
        const s = get().status;
        return s === "RUNNING" || s === "PAUSED";
      },
    }),
    process.env.NODE_ENV === "development" ? { name: "GameStatus" } : {}
  )
);
