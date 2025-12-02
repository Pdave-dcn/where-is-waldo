import { Card } from "./ui/card";
import { Clock, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/utils/formatTime.util";
import { useTimerStore } from "@/stores/gameTimer.store";
import { GameActions } from "@/services/gameActions.service";

export default function Timer() {
  const seconds = useTimerStore((s) => s.seconds);
  const isPaused = useTimerStore((s) => s.isPaused);
  const isRunning = useTimerStore((s) => s.isRunning);

  return (
    <div className="flex items-center gap-4">
      <Card className="w-fit px-4 py-2 flex items-center gap-2 shadow-md">
        <Clock size={20} className="text-muted-foreground" />
        <span className="text-2xl font-mono font-bold text-foreground">
          {formatTime(seconds)}
        </span>
      </Card>

      {isRunning && (
        <Button
          variant="outline"
          onClick={GameActions.togglePause}
          className="rounded-full shadow-md cursor-pointer"
          title={isPaused ? "Resume Game" : "Pause Game"}
        >
          {isPaused ? (
            <Play className="w-5 h-5" />
          ) : (
            <Pause className="w-5 h-5" />
          )}
        </Button>
      )}
    </div>
  );
}
