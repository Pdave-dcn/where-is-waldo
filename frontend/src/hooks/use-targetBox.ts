import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { type CharacterData } from "@/hooks/use-CharacterPositions";
import { useGameProgressStore } from "@/stores/gameProgress.store";
import { GameActions } from "@/services/gameActions.service";
import { useGameUIStore } from "@/stores/gameUI.store";

interface Position {
  x: number;
  y: number;
}

interface UseTargetBoxProps {
  characterData: CharacterData[];
}

export const useTargetBox = ({ characterData }: UseTargetBoxProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  const { boxPosition } = useGameUIStore();
  const { markCharacterAsFound } = useGameProgressStore();

  useEffect(() => {
    setIsVisible(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        GameActions.closeTargetBox();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isPositionCorrect = (
    clickPosition: Position,
    characterPosition: Position,
    tolerance: { x: number; y: number }
  ): boolean => {
    return (
      Math.abs(clickPosition.x - characterPosition.x) <= tolerance.x &&
      Math.abs(clickPosition.y - characterPosition.y) <= tolerance.y
    );
  };

  const onCharacterClick = (character: string) => {
    const selectedCharacter = characterData.find(
      (char) => char.characterName === character
    );

    if (!selectedCharacter) return;

    const isCorrect = isPositionCorrect(
      boxPosition!,
      selectedCharacter.position,
      selectedCharacter.tolerance
    );

    if (isCorrect) {
      toast.success(`🎉 You Found ${character}! 🎉`, {
        description: "Incredible! Your detective skills are top-notch!",
      });
      markCharacterAsFound(character);
    } else {
      toast.error(`🕵️ Not Quite ${character}... 🕵️`, {
        description:
          "He's close, but that's not his exact spot! Try zooming in.",
      });
    }

    GameActions.closeTargetBox();
  };

  return {
    isVisible,
    targetRef,
    onCharacterClick,
    boxPosition,
  };
};
