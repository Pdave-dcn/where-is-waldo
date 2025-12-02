import { Search } from "lucide-react";

interface GameImageOverlayProps {
  isPaused: boolean;
}

export const GameImageOverlay = ({ isPaused }: GameImageOverlayProps) => (
  <>
    {isPaused && (
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 rounded-lg" />
    )}

    <div className="absolute inset-0 pointer-events-none">
      <div className="hidden absolute sm:flex gap-1 top-0 left-4 bg-background/90 rounded-lg px-2 py-2 shadow-lg">
        <Search size={20} />
        <p className="text-sm font-semibold">Find the hidden characters!</p>
      </div>
    </div>
  </>
);
