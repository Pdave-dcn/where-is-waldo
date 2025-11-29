// StartGameCard.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSingleImageQuery } from "@/queries/image.query";
import { useGameDataStore } from "@/stores/gameData.store";
import { useGameProgressStore } from "@/stores/gameProgress.store";
import { useEffect } from "react";

interface StartGameCardProps {
  onStartGame: () => void;
}

export const StartGameCard = ({ onStartGame }: StartGameCardProps) => {
  const { selectedImageId, setSelectedImageData, setIsErrorFetchingImageData } =
    useGameDataStore();
  const { data: imageData, error } = useSingleImageQuery(selectedImageId || "");
  const { setTotalCharacters } = useGameProgressStore();

  useEffect(() => {
    if (imageData) {
      setSelectedImageData(imageData);
      setTotalCharacters(imageData.characterLocations.length);
    }

    if (error) {
      setIsErrorFetchingImageData(true);
    }
  }, [
    imageData,
    setSelectedImageData,
    setTotalCharacters,
    error,
    setIsErrorFetchingImageData,
  ]);

  return (
    <Card className="w-full max-w-5xl">
      <CardContent className="text-center py-10">
        <div className="mb-5">
          <h1 className="text-xl sm:text-3xl font-medium mb-2">
            Ready to Find Waldo?
          </h1>
          <p className="text-muted-foreground">
            Click on Waldo when you spot him in the crowd!
          </p>
        </div>
        <Button
          onClick={onStartGame}
          className="self-center cursor-pointer sm:text-lg"
        >
          Start game
        </Button>
      </CardContent>
    </Card>
  );
};
