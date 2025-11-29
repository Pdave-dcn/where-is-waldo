import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface GameMetricsStore {
  secondsTaken: number;
  startTime: number | null;

  setSecondsTaken: (seconds: number) => void;
  setStartTime: (time: number | null) => void;
  reset: () => void;
}

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
