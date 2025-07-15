import { Card, CardContent } from "./ui/card";
import { Search } from "lucide-react";
import TargetBox from "./TargetBox";
import FoundMark from "./FoundMark";
import { useGameData } from "@/hooks/use-GameData";
import { Loader } from "./ui/loader";
import useCharacterPositions from "@/hooks/use-CharacterPositions";
import { useCallback, useState } from "react";
import ShimmerSkeleton from "./ShimmerSkeleton";
import { toast } from "sonner";
import { useGameProgress } from "@/hooks/use-GameProgress";

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
  isPaused: boolean;
}

const GameImage = ({
  onImageClick,
  gameStarted,
  boxPosition,
  onBoxClose,
  showDropdown,
  isPaused,
}: GameImageProps) => {
  const { imageData, selectedImageLoading, selectedImageError } = useGameData();
  const { characters, imageRef } = useCharacterPositions(imageData);

  const { isCharacterFound } = useGameProgress();

  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle image click
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      if (!gameStarted || !imageRef.current) return;

      const imageRect = imageRef.current.getBoundingClientRect();
      const x = event.clientX - imageRect.left;
      const y = event.clientY - imageRect.top;

      onImageClick(x, y);
    },
    [gameStarted, onImageClick, imageRef]
  );

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoaded(false);
    toast.error("Game image error", {
      description: "An unexpected error occurred while loading the image.",
    });
  }, []);

  if (selectedImageLoading) {
    return (
      <div className="flex items-center justify-center bg-accent py-10">
        <Card className="w-full max-w-5xl">
          <CardContent className="p-8 flex items-center justify-center">
            <div className="text-center">
              <Loader />
              <p className="mt-4 text-muted-foreground">Loading game...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedImageError) {
    return (
      <div className="flex items-center justify-center bg-accent py-10">
        <Card className="w-full max-w-5xl">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-destructive mb-4">
              Network Error
            </h2>
            <p className="text-muted-foreground">
              Unable to load the game. Please check your internet connection and
              try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!imageData) {
    return (
      <div className="flex items-center justify-center bg-accent py-10">
        <Card className="w-full max-w-5xl">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-muted-foreground">
              No Game Data
            </h2>
            <p className="text-muted-foreground">No game data available.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const aspectRatio = imageData.originalWidth / imageData.originalHeight;

  return (
    <Card className="w-full max-w-7xl">
      <CardContent className="relative p-0">
        {/* Show skeleton while image is loading */}
        {!imageLoaded && (
          <ShimmerSkeleton aspectRatio={aspectRatio} className="rounded-lg" />
        )}

        {/* Actual image - hidden until loaded */}
        <img
          ref={imageRef}
          onClick={handleClick}
          src={imageData.url}
          alt={imageData.name}
          className={`block w-full h-auto transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="eager"
        />

        {/* Game UI elements - only show when image is loaded */}
        {imageLoaded && (
          <>
            {isPaused && (
              <div className="absolute inset-0 bg-primary/50 backdrop-blur-md flex items-center justify-center p-4 rounded-lg" />
            )}

            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute flex gap-1 top-0 left-4 bg-background bg-opacity-90 rounded-lg px-2 py-2 shadow-lg">
                <Search size={20} />
                <p className="text-sm font-semibold text-muted-foreground">
                  Find the hidden characters!
                </p>
              </div>
            </div>

            {characters.map((char) => {
              if (isCharacterFound(char.characterName)) {
                return (
                  <FoundMark
                    key={char.characterName}
                    characterName={char.characterName}
                    position={char.position}
                  />
                );
              }
              return null;
            })}

            {boxPosition && showDropdown && (
              <TargetBox
                position={boxPosition}
                onClose={onBoxClose}
                characterData={characters}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default GameImage;
