import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Search } from "lucide-react";
import TargetBox from "./TargetBox";
import { toast } from "sonner";
import FoundMark from "./FoundMark";

const ORIGINAL_IMAGE_WIDTH = 2444;
const ORIGINAL_IMAGE_HEIGHT = 1525;

const CHARACTER_RATIO_DATA = [
  {
    id: "waldo",
    name: "Waldo",
    targetXRatio: 0.5646, // Calculated: 1380 / 2444
    targetYRatio: 0.4262, // Calculated: 650 / 1525
    toleranceXRatio: 40 / ORIGINAL_IMAGE_WIDTH, // approx. 0.0164
    toleranceYRatio: 40 / ORIGINAL_IMAGE_HEIGHT, // approx. 0.0262
  },
  {
    id: "odlaw",
    name: "Odlaw",
    targetXRatio: 0.4362, // Calculated: 1066 / 2444
    targetYRatio: 0.3056, // Calculated: 466 / 1525
    toleranceXRatio: 40 / ORIGINAL_IMAGE_WIDTH,
    toleranceYRatio: 40 / ORIGINAL_IMAGE_HEIGHT,
  },
];

interface Position {
  x: number;
  y: number;
}

interface GameImageProps {
  onImageClick: (x: number, y: number) => void;
  gameStarted: boolean;
  boxPosition: Position | null;
  onBoxClose: () => void;
  showDropdown: boolean;
  timerRef: React.RefObject<{ stop: () => number; reset: () => void } | null>;
  isWaldoFound: boolean;
  isOdlawFound: boolean;
  setIsWaldoFound: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOdlawFound: React.Dispatch<React.SetStateAction<boolean>>;
  setGameEnded: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameImage = ({
  onImageClick,
  gameStarted,
  boxPosition,
  onBoxClose,
  showDropdown,
  timerRef,
  isWaldoFound,
  isOdlawFound,
  setIsWaldoFound,
  setIsOdlawFound,
  setGameEnded,
}: GameImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const [waldoPosition, setWaldoPosition] = useState<Position>({ x: 0, y: 0 });
  const [odlawPosition, setOdlawPosition] = useState<Position>({ x: 0, y: 0 });
  const [tolerance, setTolerance] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const imgElement = imageRef.current;

    const calculateAndSetPositions = () => {
      if (imgElement) {
        const currentImageRect = imgElement.getBoundingClientRect();
        const currentDisplayedWidth = currentImageRect.width;
        const currentDisplayedHeight = currentImageRect.height;

        // This is how much the image has scaled down/up from its original size
        const scaleX = currentDisplayedWidth / ORIGINAL_IMAGE_WIDTH;
        const scaleY = currentDisplayedHeight / ORIGINAL_IMAGE_HEIGHT;

        if (currentDisplayedWidth === 0 || currentDisplayedHeight === 0) {
          console.warn(
            "Image dimensions are zero, cannot calculate positions."
          );
          return;
        }

        // Calculate Waldo's dynamic position based on original ratios and current scale
        const waldoData = CHARACTER_RATIO_DATA.find(
          (char) => char.id === "waldo"
        )!;
        setWaldoPosition({
          x: waldoData.targetXRatio * ORIGINAL_IMAGE_WIDTH * scaleX,
          y: waldoData.targetYRatio * ORIGINAL_IMAGE_HEIGHT * scaleY,
        });

        const odlawData = CHARACTER_RATIO_DATA.find(
          (char) => char.id === "odlaw"
        )!;
        setOdlawPosition({
          x: odlawData.targetXRatio * ORIGINAL_IMAGE_WIDTH * scaleX,
          y: odlawData.targetYRatio * ORIGINAL_IMAGE_HEIGHT * scaleY,
        });

        setTolerance({
          x: waldoData.toleranceXRatio * ORIGINAL_IMAGE_WIDTH * scaleX,
          y: waldoData.toleranceYRatio * ORIGINAL_IMAGE_HEIGHT * scaleY,
        });
      }
    };

    // Recalculate on image load
    if (imgElement && imgElement.complete) {
      calculateAndSetPositions(); // If image already loaded
    } else {
      imgElement?.addEventListener("load", calculateAndSetPositions);
    }

    // Recalculate on window resize
    window.addEventListener("resize", calculateAndSetPositions);

    return () => {
      imgElement?.removeEventListener("load", calculateAndSetPositions);
      window.removeEventListener("resize", calculateAndSetPositions);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!gameStarted || !imageRef.current) return;

    const imageRect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - imageRect.left;
    const y = event.clientY - imageRect.top;

    // console.log(
    //   "Clicked position (pixels relative to current image display):",
    //   x,
    //   y
    // );

    onImageClick(x, y);
  };

  if (isWaldoFound && isOdlawFound) {
    toast.success("Game complete", {
      description: "You've found both Waldo and Odlaw!!",
    });
    timerRef.current?.stop();
    setGameEnded(true);
  }

  return (
    <Card className="w-full max-w-7xl">
      <CardContent className="relative p-0">
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
              Click on Waldo or Odlaw when you find them!
            </p>
          </div>
        </div>

        {boxPosition && showDropdown && (
          <TargetBox
            position={boxPosition}
            onClose={onBoxClose}
            waldoPosition={waldoPosition}
            odlawPosition={odlawPosition}
            tolerance={tolerance}
            setIsWaldoFound={setIsWaldoFound}
            setIsOdlawFound={setIsOdlawFound}
          />
        )}

        {isWaldoFound && (
          <FoundMark position={waldoPosition} characterName="Waldo" />
        )}
        {isOdlawFound && (
          <FoundMark position={odlawPosition} characterName="Odlaw" />
        )}
      </CardContent>
    </Card>
  );
};

export default GameImage;
