import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TimerState {
  seconds: number;
  isRunning: boolean;
  isPaused: boolean;

  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  stop: () => number;
}

export const useTimerStore = create<TimerState>()(
  devtools(
    (set, get) => {
      let intervalId: ReturnType<typeof setInterval> | null = null;

      return {
        seconds: 0,
        isRunning: false,
        isPaused: false,

        start: () => {
          if (intervalId) clearInterval(intervalId);

          intervalId = setInterval(() => {
            const { isPaused } = get();
            if (!isPaused) {
              set((s: TimerState) => ({ seconds: s.seconds + 1 }));
            }
          }, 1000);

          set(
            { isRunning: true, isPaused: false },
            false,
            "Timer/start"
          );
        },

        pause: () => {
          set({ isPaused: true }, false, "Timer/pause");
        },

        resume: () => {
          set({ isPaused: false }, false, "Timer/resume");
        },

        reset: () => {
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }

          set(
            { seconds: 0, isRunning: false, isPaused: false },
            false,
            "Timer/reset"
          );
        },

        stop: () => {
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }

          const { seconds } = get();

          set(
            { isRunning: false, isPaused: false },
            false,
            "Timer/stop"
          );

          return seconds;
        },
      };
    },
    process.env.NODE_ENV === "development" ? { name: "Timer" } : {}
  )
);
