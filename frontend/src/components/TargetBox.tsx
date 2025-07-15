import { useEffect, useRef, useState } from "react";
import CharacterDropdown from "./CharacterDropdown";
import { toast } from "sonner";
import { type CharacterData } from "@/hooks/use-CharacterPositions";
import { useGameProgress } from "@/hooks/use-GameProgress";

interface Position {
  x: number;
  y: number;
}

interface TargetBoxProps {
  position: Position;
  onClose: () => void;
  characterData: CharacterData[];
}

const TargetBox = ({ position, onClose, characterData }: TargetBoxProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const { markCharacterAsFound } = useGameProgress();

  useEffect(() => {
    setIsVisible(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const onCharacterClick = (character: string) => {
    const selectedCharacter = characterData.find(
      (char) => char.characterName === character
    );

    if (!selectedCharacter) return;

    const isCorrectPosition =
      Math.abs(position.x - selectedCharacter.position.x) <=
        selectedCharacter.tolerance.x &&
      Math.abs(position.y - selectedCharacter.position.y) <=
        selectedCharacter.tolerance.y;

    if (isCorrectPosition) {
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

    onClose();
  };

  return (
    <div
      ref={targetRef}
      className={`absolute z-50 transition-all duration-200 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white animate-pulse" />
        <div className="absolute inset-0 w-16 h-16 border-2 border-white" />
      </div>

      <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
        <CharacterDropdown onCharacterClick={onCharacterClick} />
      </div>
    </div>
  );
};

export default TargetBox;
