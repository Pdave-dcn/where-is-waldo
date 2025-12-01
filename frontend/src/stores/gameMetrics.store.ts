import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TimerRef {
  reset: () => void;
  stop: () => number;
}
interface GameMetricsState {
  secondsTaken: number;
  startTime: number | null;
  timerRef: TimerRef | null;

  setSecondsTaken: (seconds: number) => void;
  setStartTime: (time: number | null) => void;
  reset: () => void;
  setTimerRef: (ref: TimerRef | null) => void;
}

/**
 * Game metrics store for tracking performance and timing data.
 * Records when the game started and total time taken to complete,
 * used for displaying results and leaderboard entries.
 */
export const useGameMetricsStore = create<GameMetricsState>()(
  devtools(
    (set) => ({
      secondsTaken: 0,
      startTime: null,
      timerRef: null,

      setSecondsTaken: (seconds) =>
        set(
          { secondsTaken: seconds },
          false,
          `Metrics/setSecondsTaken: ${seconds}s`
        ),
      setStartTime: (time) =>
        set({ startTime: time }, false, "Metrics/setStartTime"),

      reset: () =>
        set(
          {
            secondsTaken: 0,
            startTime: null,
          },
          false,
          "Metrics/reset"
        ),

      setTimerRef: (ref) => {
        set({ timerRef: ref }, false, "Metrics/setTimerRef");
      },
    }),
    { name: "GameMetrics" }
  )
);
