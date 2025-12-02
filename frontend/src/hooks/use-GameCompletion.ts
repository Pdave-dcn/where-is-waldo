import { useEffect } from "react";
import { toast } from "sonner";
import { useGameProgressStore } from "@/stores/gameProgress.store";
import { useGameDataStore } from "@/stores/gameData.store";
import { GameActions } from "@/services/gameActions.service";

/**
 * Monitors game completion and triggers end game flow.
 *
 * Watches for all characters to be found, then displays a success toast
 * and automatically ends the game session.
 */
const useGameCompletion = () => {
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

      GameActions.endGame();
    }
  }, [isGameComplete, characterNumber]);
};

export default useGameCompletion;
