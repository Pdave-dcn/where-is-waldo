import { useEffect, useState } from "react";
import { useGameMetricsStore } from "@/stores/gameMetrics.store";
import { useCompletionMutation } from "@/queries/completion.query";
import { useGameDataStore } from "@/stores/gameData.store";

export const useWinnerForm = () => {
  const [name, setName] = useState("");

  const { selectedImageId, totalCharacters, availableCharacterNames } =
    useGameDataStore();
  const { secondsTaken } = useGameMetricsStore();

  const completionMutation = useCompletionMutation();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const characterText =
    totalCharacters > 1
      ? `all ${totalCharacters} characters`
      : availableCharacterNames.length === 1
      ? `${availableCharacterNames[0]}`
      : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (secondsTaken && selectedImageId) {
      const playerData = {
        timeTakenSeconds: secondsTaken,
        playerName: name,
      };

      completionMutation.mutate({ playerData, selectedImageId });
    }
  };

  return {
    secondsTaken,
    name,
    setName,
    characterText,
    handleSubmit,
    isSubmitting: completionMutation.isPending,
  };
};
