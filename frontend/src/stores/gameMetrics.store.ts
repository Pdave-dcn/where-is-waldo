import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface GameMetricsStore {
  secondsTaken: number;
  startTime: number | null;

  setSecondsTaken: (seconds: number) => void;
  setStartTime: (time: number | null) => void;
  reset: () => void;
}

/**
 * Game metrics store for tracking performance and timing data.
 * Records when the game started and total time taken to complete,
 * used for displaying results and leaderboard entries.
 */
export const useGameMetricsStore = create<GameMetricsStore>()(
  devtools(
    (set) => ({
      secondsTaken: 0,
      startTime: null,

      setSecondsTaken: (seconds) => set({ secondsTaken: seconds }),
      setStartTime: (time) => set({ startTime: time }),

      reset: () =>
        set({
          secondsTaken: 0,
          startTime: null,
        }),
    }),
    { name: "GameMetrics" }
  )
);
