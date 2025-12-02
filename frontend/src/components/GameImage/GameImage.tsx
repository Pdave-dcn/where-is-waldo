import { Card, CardContent } from "../ui/card";
import ShimmerSkeleton from "../ShimmerSkeleton";
import useCharacterPositions from "@/hooks/use-CharacterPositions";
import { useGameDataStore } from "@/stores/gameData.store";
import { GameImageErrorState } from "./ErrorState";
import { GameImageOverlay } from "./GameImageOverlay";
import { CharacterMarkers } from "./CharacterMarkers";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useGameStatusStore } from "@/stores/gameStatus.store";
import { GameActions } from "@/services/gameActions.service";
import TargetBox from "../TargetBox";

const GameImage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const { selectedImageData, isErrorFetchingImageData, aspectRatio } =
    useGameDataStore();

  const { characterPositions: characterData, imageRef } =
    useCharacterPositions();

  const { isActive, isPaused } = useGameStatusStore();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      if (!isActive() || !imageRef.current) return;

      const imageRect = imageRef.current.getBoundingClientRect();
      const x = event.clientX - imageRect.left;
      const y = event.clientY - imageRect.top;

      GameActions.handleImageClick(x, y);
    },
    [isActive, imageRef]
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

  if (isErrorFetchingImageData) {
    return (
      <GameImageErrorState
        title="Network Error"
        message="Unable to load the game. Please check your internet connection and try again."
      />
    );
  }

  if (!selectedImageData) {
    return (
      <GameImageErrorState
        title="No Game Data"
        message="No game data available."
      />
    );
  }

  return (
    <Card className="w-full max-w-7xl">
      <CardContent className="relative p-0">
        {!imageLoaded && (
          <ShimmerSkeleton aspectRatio={aspectRatio} className="rounded-lg" />
        )}

        <img
          ref={imageRef}
          onClick={handleClick}
          src={selectedImageData.url}
          alt={selectedImageData.name}
          className={`block w-full h-auto transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="eager"
        />

        {imageLoaded && (
          <>
            <GameImageOverlay isPaused={isPaused()} />
            <CharacterMarkers characterData={characterData} />
            <TargetBox characterData={characterData} />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default GameImage;
