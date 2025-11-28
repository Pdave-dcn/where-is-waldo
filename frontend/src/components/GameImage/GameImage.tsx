import { Card, CardContent } from "../ui/card";
import ShimmerSkeleton from "../ShimmerSkeleton";
import useCharacterPositions from "@/hooks/use-CharacterPositions";
import { useSingleImageQuery } from "@/queries/image.query";
import { useGameDataStore } from "@/stores/gameData.store";
import { GameImageLoadingState } from "./LoadingState";
import { GameImageErrorState } from "./ErrorState";
import { GameImageOverlay } from "./GameImageOverlay";
import { CharacterMarkers } from "./CharacterMarkers";
import { useCallback, useState } from "react";
import { toast } from "sonner";

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
  const [imageLoaded, setImageLoaded] = useState(false);

  const { selectedImageId, setSelectedImageData } = useGameDataStore();
  const {
    data: imageData,
    isLoading,
    error,
  } = useSingleImageQuery(selectedImageId || "");

  setSelectedImageData(imageData || null);

  const { characters, imageRef } = useCharacterPositions(imageData);

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

  if (isLoading) {
    return <GameImageLoadingState />;
  }

  if (error) {
    return (
      <GameImageErrorState
        title="Network Error"
        message="Unable to load the game. Please check your internet connection and try again."
      />
    );
  }

  if (!imageData) {
    return (
      <GameImageErrorState
        title="No Game Data"
        message="No game data available."
      />
    );
  }

  const aspectRatio = imageData.originalWidth / imageData.originalHeight;

  return (
    <Card className="w-full max-w-7xl">
      <CardContent className="relative p-0">
        {!imageLoaded && (
          <ShimmerSkeleton aspectRatio={aspectRatio} className="rounded-lg" />
        )}

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

        {imageLoaded && (
          <>
            <GameImageOverlay isPaused={isPaused} />
            <CharacterMarkers
              characters={characters}
              boxPosition={boxPosition}
              showDropdown={showDropdown}
              onBoxClose={onBoxClose}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default GameImage;
