import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TimerState {
  seconds: number;
  isRunning: boolean;
  isPaused: boolean;
  _intervalId: NodeJS.Timeout | null;

  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  stop: () => number;
}

/**
 * Game timer store for tracking elapsed time during a game session.
 * Provides controls to start, pause, resume, reset, and stop the timer.
 */
export const useTimerStore = create<TimerState>()(
  devtools(
    (set, get) => ({
      seconds: 0,
      isRunning: false,
      isPaused: false,
      _intervalId: null,

      start: () => {
        const { _intervalId } = get();
        if (_intervalId) clearInterval(_intervalId);

        const id = setInterval(() => {
          const { isPaused } = get();
          if (!isPaused) {
            set((s) => ({ seconds: s.seconds + 1 }));
          }
        }, 1000);

        set(
          {
            isRunning: true,
            isPaused: false,
            _intervalId: id,
          },
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
        const { _intervalId } = get();
        if (_intervalId) clearInterval(_intervalId);

        set(
          {
            seconds: 0,
            isRunning: false,
            isPaused: false,
            _intervalId: null,
          },
          false,
          "Timer/reset"
        );
      },

      stop: () => {
        const { _intervalId, seconds } = get();
        if (_intervalId) clearInterval(_intervalId);

        set(
          {
            isRunning: false,
            isPaused: false,
            _intervalId: null,
          },
          false,
          "Timer/stop"
        );

        return seconds;
      },
    }),
    { name: "Timer" }
  )
);
