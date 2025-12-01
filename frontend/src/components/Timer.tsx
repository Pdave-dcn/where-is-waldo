import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Card } from "./ui/card";
import { Clock, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/utils/formatTime.util";

interface TimerProps {
  isRunning: boolean;
  onPauseToggle: () => void;
  isPaused: boolean;
}

const Timer = forwardRef(
  ({ isRunning, onPauseToggle, isPaused }: TimerProps, ref) => {
    const [seconds, setSeconds] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);

    useEffect(() => {
      setIsTimerActive(isRunning);
    }, [isRunning]);

    useEffect(() => {
      let interval: ReturnType<typeof setInterval>;

      if (isTimerActive && !isPaused) {
        interval = setInterval(() => {
          setSeconds((prev) => prev + 1);
        }, 1000);
      }

      return () => {
        if (interval) clearInterval(interval);
      };
    }, [isTimerActive, isPaused]);

    useImperativeHandle(ref, () => ({
      reset: () => {
        setIsTimerActive(false);
        setSeconds(0);
      },

      stop: () => {
        setIsTimerActive(false);
        return seconds;
      },
    }));

    return (
      <div className="flex items-center gap-4">
        <Card className="w-fit px-4 py-2 flex items-center gap-2 shadow-md">
          <Clock size={20} className="text-muted-foreground" />{" "}
          <span className="text-2xl font-mono font-bold text-foreground">
            {formatTime(seconds)}
          </span>
        </Card>

        {isRunning && (
          <Button
            variant="outline"
            onClick={onPauseToggle}
            className="rounded-full shadow-md cursor-pointer"
            title={isPaused ? "Resume Game" : "Pause Game"}
          >
            {isPaused ? (
              <Play className="w-5 h-5 fill-current text-primary" />
            ) : (
              <Pause className="w-5 h-5 text-muted-foreground" />
            )}
          </Button>
        )}
      </div>
    );
  }
);

export default Timer;
