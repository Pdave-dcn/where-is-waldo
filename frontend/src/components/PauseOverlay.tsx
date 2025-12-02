import { Play, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface PauseOverlayProps {
  onResume: () => void;
  onRestart: () => void;
  onQuit: () => void;
}

const PauseOverlay = ({ onResume, onRestart, onQuit }: PauseOverlayProps) => {
  useEffect(() => {
    // Prevent scrolling when overlay is mounted
    document.body.style.overflow = "hidden";

    // Restore scrolling when overlay is unmounted
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center overflow-hidden">
      <div className="bg-background rounded-lg p-8 shadow-2xl border-4 text-center max-w-md mx-4">
        <h2 className="text-3xl font-bold text-primary mb-4">Game Paused</h2>
        <p className="text-secondary-foreground mb-8 text-lg">
          Take a break! The timer is paused.
        </p>

        <div className="flex flex-col gap-4 justify-center">
          <Button
            onClick={onResume}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200 flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5" />
            Resume Game
          </Button>

          <Button
            onClick={onRestart}
            variant="outline"
            className="font-bold py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            Restart Game
          </Button>

          <Button
            onClick={onQuit}
            variant="outline"
            className="font-bold py-3 px-6 rounded-full flex items-center gap-2 justify-center cursor-pointer"
          >
            <Home className="w-5 h-5" />
            Choose Another Image
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PauseOverlay;
