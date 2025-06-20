import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Search } from "lucide-react";
import TargetBox from "./TargetBox";

interface GameImageProps {
  onImageClick: (x: number, y: number) => void;
  gameStarted: boolean;
  boxPosition: {
    x: number;
    y: number;
  } | null;
  onBoxClose: () => void;
  showDropdown: boolean;
}

const GameImage = ({
  onImageClick,
  gameStarted,
  boxPosition,
  onBoxClose,
  showDropdown,
}: GameImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!gameStarted || !imageRef.current) return;

    const imageRect = imageRef.current.getBoundingClientRect();

    const x = event.clientX - imageRect.left;
    const y = event.clientY - imageRect.top;

    //console.log(x, y);

    onImageClick(x, y);
  };

  return (
    <Card className="w-full max-w-5xl">
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
          <TargetBox position={boxPosition} onClose={onBoxClose} />
        )}
      </CardContent>
    </Card>
  );
};

export default GameImage;
