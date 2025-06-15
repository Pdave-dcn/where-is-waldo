import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Clock } from "lucide-react";

interface TimerProps {
  gameStarted: boolean;
}

const Timer = forwardRef(({ gameStarted }: TimerProps, ref) => {
  const [seconds, setSeconds] = useState(0);

  useImperativeHandle(ref, () => ({
    reset: () => setSeconds(0),
  }));

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (gameStarted) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Card className="w-[10rem] flex items-center">
        <CardContent>
          <div className="flex gap-4 items-center">
            <Clock size={20} />
            <span className="text-2xl font-mono font-bold">
              {formatTime(seconds)}
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
});

export default Timer;
