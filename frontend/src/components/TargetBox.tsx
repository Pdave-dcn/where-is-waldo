import { useEffect, useRef, useState, useMemo } from "react";
import CharacterDropdown from "./CharacterDropdown";
import { toast } from "sonner";
import { type CharacterData } from "@/hooks/use-CharacterPositions";

interface Position {
  x: number;
  y: number;
}

interface TargetBoxProps {
  position: Position;
  onClose: () => void;
  characterData: CharacterData[];
  setIsWaldoFound: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOdlawFound: React.Dispatch<React.SetStateAction<boolean>>;
}

const TargetBox = ({
  position,
  onClose,
  characterData,
  setIsWaldoFound,
  setIsOdlawFound,
}: TargetBoxProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

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

  const waldoData = useMemo(
    () => characterData.find((char) => char.characterName === "Waldo"),
    [characterData]
  );

  const odlawData = useMemo(
    () => characterData.find((char) => char.characterName === "Odlaw"),
    [characterData]
  );

  const onCharacterClick = (character: string) => {
    if (!waldoData || !odlawData) {
      console.error("Required character data (Waldo/Odlaw) not found.");

      return;
    }

    if (character === "Waldo") {
      const isCorrectPosition =
        Math.abs(position.x - waldoData.position.x) <= waldoData.tolerance.x &&
        Math.abs(position.y - waldoData.position.y) <= waldoData.position.y;

      if (isCorrectPosition) {
        toast.success("🎉 You Found Waldo! 🎉", {
          description: "Incredible! Your detective skills are top-notch!",
        });

        setIsWaldoFound(true);
      } else {
        toast.error("🕵️ Not Quite Waldo... 🕵️", {
          description:
            "He's close, but that's not his exact spot! Try zooming in.",
        });
      }
    } else if (character === "Odlaw") {
      const isCorrectPosition =
        Math.abs(position.x - odlawData.position.x) <= odlawData.tolerance.x &&
        Math.abs(position.y - odlawData.position.y) <= odlawData.tolerance.y;

      if (isCorrectPosition) {
        toast.success("🎉 You Found Odlaw! 🎉", {
          description: "Incredible! Your detective skills are top-notch!",
        });

        setIsOdlawFound(true);
      } else {
        toast.error("🕵️ Not Quite Odlaw... 🕵️", {
          description:
            "He's close, but that's not his exact spot! Try zooming in.",
        });
      }
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
        transform: "translate(-25%, -50%)",
      }}
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 animate-pulse" />
        <div className="absolute inset-0 w-16 h-16 border-2" />
      </div>

      <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
        <CharacterDropdown onCharacterClick={onCharacterClick} />
      </div>
    </div>
  );
};

export default TargetBox;
