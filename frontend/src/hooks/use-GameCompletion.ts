import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useGameProgress } from "./use-GameProgress";

const useGameCompletion = (
  timerRef: React.RefObject<{ stop: () => number; reset: () => void } | null>,
  setGameEnded: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [secondsTaken, setSecondsTaken] = useState<number | null>(null);
  const { areAllCharactersFound, totalCharacters, availableCharacters } =
    useGameProgress();

  const isGameComplete = areAllCharactersFound();

  const characterNumber =
    totalCharacters > 1
      ? `all ${totalCharacters} characters`
      : availableCharacters.length === 1
      ? `${availableCharacters[0]}`
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
