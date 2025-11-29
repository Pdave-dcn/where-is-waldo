import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useGameProgressStore } from "@/stores/gameProgress.store";
import { useGameDataStore } from "@/stores/gameData.store";

const useGameCompletion = (
  timerRef: React.RefObject<{ stop: () => number; reset: () => void } | null>,
  setGameEnded: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [secondsTaken, setSecondsTaken] = useState<number | null>(null);

  const { totalCharacters, availableCharacterNames } = useGameDataStore();

  const { areAllCharactersFound } = useGameProgressStore();

  const isGameComplete = areAllCharactersFound();

  const characterNumber =
    totalCharacters > 1
      ? `all ${totalCharacters} characters`
      : availableCharacterNames.length === 1
      ? `${availableCharacterNames[0]}`
      : "";

  useEffect(() => {
    if (isGameComplete) {
      toast.success("Game complete", {
        description: `You've found ${characterNumber} successfully!!`,
      });
      const time = timerRef.current?.stop();
      setSecondsTaken(time ?? null);
      setGameEnded(true);
    }
  }, [isGameComplete, characterNumber, timerRef, setGameEnded]);

  return secondsTaken;
};

export default useGameCompletion;
