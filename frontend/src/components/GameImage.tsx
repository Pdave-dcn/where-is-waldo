import { Card, CardContent } from "./ui/card";
import { Search } from "lucide-react";
import TargetBox from "./TargetBox";
import FoundMark from "./FoundMark";
import { useGameData } from "@/hooks/use-GameData";
import { Loader } from "./ui/loader";
import WinnerForm from "./WinnerForm";
import useCharacterPositions from "@/hooks/use-CharacterPositions";
import useGameCompletion from "@/hooks/use-GameCompletion";
import { useCallback } from "react";

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
  const { imageData, selectedImageLoading, selectedImageError } = useGameData();
  const { characters, imageRef } = useCharacterPositions(imageData);
  const secondsTaken = useGameCompletion(
    isOdlawFound,
    isWaldoFound,
    timerRef,
    setGameEnded
  );

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

  if (selectedImageLoading) {
    return (
      <Card className="w-full max-w-7xl">
        <CardContent className="p-8 flex items-center justify-center">
          <div className="text-center">
            <Loader />
            <p className="mt-4 text-muted-foreground">Loading game...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (selectedImageError) {
    return (
      <Card className="w-full max-w-7xl">
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
    );
  }

  if (!imageData) {
    return (
      <Card className="w-full max-w-7xl">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold text-muted-foreground">
            No Game Data
          </h2>
          <p className="text-muted-foreground">No game data available.</p>
        </CardContent>
      </Card>
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

        {characters.map((char) => {
          if (
            (char.characterName === "Waldo" && isWaldoFound) ||
            (char.characterName === "Odlaw" && isOdlawFound)
          ) {
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
            setIsWaldoFound={setIsWaldoFound}
            setIsOdlawFound={setIsOdlawFound}
          />
        )}
      </CardContent>

      {isWaldoFound && isOdlawFound && (
        <WinnerForm secondsTaken={secondsTaken} />
      )}
    </Card>
  );
};

export default GameImage;
