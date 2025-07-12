import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent } from "./ui/card";
import { Search } from "lucide-react";
import TargetBox from "./TargetBox";
import { toast } from "sonner";
import FoundMark from "./FoundMark";
import { useGameData } from "@/hooks/use-GameData";
import { Loader } from "./ui/loader";
import WinnerForm from "./WinnerForm";
import debounce from "lodash.debounce";

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
  isPaused: boolean;
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
  isPaused,
}: GameImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const [waldoPosition, setWaldoPosition] = useState<Position>({ x: 0, y: 0 });
  const [odlawPosition, setOdlawPosition] = useState<Position>({ x: 0, y: 0 });
  const [tolerance, setTolerance] = useState<Position>({ x: 0, y: 0 });

  const secondsTakenRef = useRef<number | null>(null);

  const { imageData, selectedImageLoading, selectedImageError } = useGameData();

  const calculateAndSetPositions = useCallback(() => {
    const imgElement = imageRef.current;

    if (!imgElement || !imageData) {
      console.warn(
        "Image element or image data not yet available for position calculation."
      );

      setWaldoPosition({ x: 0, y: 0 });
      setOdlawPosition({ x: 0, y: 0 });
      setTolerance({ x: 0, y: 0 });

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

    try {
      if (imageData.originalWidth === 0 || imageData.originalHeight === 0) {
        console.error(
          "Original image dimensions are zero or invalid in imageData."
        );
        toast.error("Critical game data missing", {
          description: "Original image dimensions are invalid.",
        });

        setWaldoPosition({ x: 0, y: 0 });
        setOdlawPosition({ x: 0, y: 0 });
        setTolerance({ x: 0, y: 0 });

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
        toast.error("Game Setup Error", {
          description: "Critical character data is missing for this image.",
          duration: 5000,
        });

        setWaldoPosition({ x: 0, y: 0 });
        setOdlawPosition({ x: 0, y: 0 });
        setTolerance({ x: 0, y: 0 });

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
    } catch (error: unknown) {
      console.error(
        "An unexpected error occurred while calculating character positions:",
        error
      );
      toast.error("Calculation Error", {
        description:
          "There was an unexpected issue calculating character positions. Please refresh.",
        duration: 5000,
      });

      setWaldoPosition({ x: 0, y: 0 });
      setOdlawPosition({ x: 0, y: 0 });
      setTolerance({ x: 0, y: 0 });
    }
  }, [imageData, setWaldoPosition, setOdlawPosition, setTolerance]);

  const debouncedCalculatePositions = useMemo(
    () => debounce(calculateAndSetPositions, 100),
    [calculateAndSetPositions]
  );

  useEffect(() => {
    const imgElement = imageRef.current;

    const handleLoad = () => debouncedCalculatePositions();
    const handleResize = () => debouncedCalculatePositions();

    if (imgElement) {
      if (imgElement.complete) {
        debouncedCalculatePositions();
      }
      imgElement.addEventListener("load", handleLoad);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      if (imgElement) {
        imgElement.removeEventListener("load", handleLoad);
      }
      window.removeEventListener("resize", handleResize);
      debouncedCalculatePositions.cancel();
    };
  }, [debouncedCalculatePositions]);

  // Game complete logic
  useEffect(() => {
    if (isWaldoFound && isOdlawFound) {
      toast.success("Game complete", {
        description: "You've found both Waldo and Odlaw!!",
      });
      const time = timerRef.current?.stop();
      secondsTakenRef.current = time ?? null;
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

  if (selectedImageLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (selectedImageError) {
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

        {isPaused && (
          <div className="absolute inset-0 bg-primary/50 backdrop-blur-md flex items-center justify-center p-4 rounded-lg" />
        )}

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
      {isWaldoFound && isOdlawFound && (
        <WinnerForm secondsTakenRef={secondsTakenRef} />
      )}
    </Card>
  );
};

export default GameImage;
