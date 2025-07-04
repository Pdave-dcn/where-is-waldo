import { useRef, useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "./ui/card";
import { Search } from "lucide-react";
import TargetBox from "./TargetBox";
import { toast } from "sonner";
import FoundMark from "./FoundMark";
import { useGameData } from "@/hooks/use-GameData";

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

  const { imageData, loading, error } = useGameData();

  const calculateAndSetPositions = useCallback(() => {
    const imgElement = imageRef.current;

    if (!imgElement || !imageData) {
      console.warn(
        "Image element or image data not yet available for position calculation."
      );
      return;
    }

    const currentImageRect = imgElement.getBoundingClientRect();
    const currentDisplayedWidth = currentImageRect.width;
    const currentDisplayedHeight = currentImageRect.height;

    if (currentDisplayedWidth === 0 || currentDisplayedHeight === 0) {
      console.warn(
        "Image dimensions are zero, cannot calculate positions yet."
      );
      return;
    }

    // Calculate scale based on loaded imageData's original dimensions
    const scaleX = currentDisplayedWidth / imageData.originalWidth;
    const scaleY = currentDisplayedHeight / imageData.originalHeight;

    // Find character data from imageData.characterLocations
    const waldoData = imageData.characterLocations.find(
      (char) => char.characterName === "Waldo"
    );
    const odlawData = imageData.characterLocations.find(
      (char) => char.characterName === "Odlaw"
    );

    if (!waldoData || !odlawData) {
      console.error(
        "Required character data (Waldo/Odlaw) not found in imageData.characterLocations."
      );
      // Display an error to the user or take other actions
      return;
    }

    setWaldoPosition({
      x: waldoData.targetXRatio * imageData.originalWidth * scaleX,
      y: waldoData.targetYRatio * imageData.originalHeight * scaleY,
    });

    setOdlawPosition({
      x: odlawData.targetXRatio * imageData.originalWidth * scaleX,
      y: odlawData.targetYRatio * imageData.originalHeight * scaleY,
    });

    setTolerance({
      x: waldoData.toleranceXRatio * imageData.originalWidth * scaleX,
      y: waldoData.toleranceYRatio * imageData.originalHeight * scaleY,
    });
  }, [imageData]);

  useEffect(() => {
    const imgElement = imageRef.current;

    const handleLoad = () => calculateAndSetPositions();
    const handleResize = () => calculateAndSetPositions();

    if (imgElement) {
      if (imgElement.complete) {
        calculateAndSetPositions();
      }
      imgElement.addEventListener("load", handleLoad);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      if (imgElement) {
        imgElement.removeEventListener("load", handleLoad);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateAndSetPositions]);

  // Game complete logic
  useEffect(() => {
    if (isWaldoFound && isOdlawFound) {
      toast.success("Game complete", {
        description: "You've found both Waldo and Odlaw!!",
      });
      timerRef.current?.stop();
      setGameEnded(true);
    }
  }, [isWaldoFound, isOdlawFound, timerRef, setGameEnded]);

  // Handle image click
  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!gameStarted || !imageRef.current) return;

    const imageRect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - imageRect.left;
    const y = event.clientY - imageRect.top;

    onImageClick(x, y);
  };

  if (loading) {
    return (
      <div>
        <h1>Loading game data...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>A network error has been encountered</h1>
      </div>
    );
  }

  if (!imageData) {
    return (
      <div>
        <h1>No game data available.</h1>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-7xl">
      <CardContent className="relative p-0">
        <img
          ref={imageRef}
          onClick={handleClick}
          src={imageData.url}
          alt={imageData.name}
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
