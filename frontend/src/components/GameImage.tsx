import { useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Search } from "lucide-react";
import TargetBox from "./TargetBox";
import { toast } from "sonner";

interface GameImageProps {
  onImageClick: (x: number, y: number) => void;
  gameStarted: boolean;
  boxPosition: {
    x: number;
    y: number;
  } | null;
  onBoxClose: () => void;
  showDropdown: boolean;
  timerRef: React.RefObject<{ stop: () => number; reset: () => void } | null>;
}

const GameImage = ({
  onImageClick,
  gameStarted,
  boxPosition,
  onBoxClose,
  showDropdown,
  timerRef,
}: GameImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isWaldoFound, setIsWaldoFound] = useState(false);
  const [isOdlawFound, setIsOdlawFound] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!gameStarted || !imageRef.current) return;

    const imageRect = imageRef.current.getBoundingClientRect();

    const x = event.clientX - imageRect.left;
    const y = event.clientY - imageRect.top;

    //console.log(x, y);

    onImageClick(x, y);
  };

  if (isWaldoFound && isOdlawFound) {
    toast.success("Game complete", {
      description: "You've found both Waldo and Odlaw!!",
    });
    timerRef.current?.stop();
  }

  return (
    <Card className="w-full max-w-7xl">
      <CardContent className="relative">
        <img
          ref={imageRef}
          onClick={handleClick}
          src="img-1.jpg"
          alt="Where's Waldo Game Image"
          className="block w-full h-auto"
        />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute flex gap-1 top-0 left-4 bg-background bg-opacity-90 rounded-lg px-2 py-2 shadow-lg">
            <Search size={20} />
            <p className="text-sm font-semibold text-muted-foreground">
              Click on Waldo when you find him!
            </p>
          </div>
        </div>

        {boxPosition && showDropdown && (
          <TargetBox
            position={boxPosition}
            onClose={onBoxClose}
            // timerRef={timerRef}
            setIsWaldoFound={setIsWaldoFound}
            setIsOdlawFound={setIsOdlawFound}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default GameImage;
