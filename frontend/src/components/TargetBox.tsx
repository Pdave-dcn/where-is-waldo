import { useEffect, useRef, useState } from "react";
import CharacterDropdown from "./CharacterDropdown";
import { toast } from "sonner";

interface TargetBoxProps {
  position: { x: number; y: number };
  onClose: () => void;
  timerRef: React.RefObject<{ stop: () => void; reset: () => void } | null>;
}

const TargetBox = ({ position, onClose, timerRef }: TargetBoxProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const waldoPosition = { x: 683, y: 324 };
  const tolerance = 10;

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
    const isWaldo = character === "Waldo";

    const isCorrectPosition =
      Math.abs(position.x - waldoPosition.x) <= tolerance &&
      Math.abs(position.y - waldoPosition.y) <= tolerance;

    // const result = {
    //   x: Math.abs(position.x - waldoPosition.x),
    //   y: Math.abs(position.y - waldoPosition.y),
    // };

    // console.log(result);

    if (isWaldo && isCorrectPosition) {
      toast.success("🎉 You Found Waldo! 🎉", {
        description: "Incredible! Your detective skills are top-notch!",
      });
      timerRef.current?.stop();
    } else if (isWaldo && !isCorrectPosition) {
      toast.error("🕵️ Not Quite Waldo... 🕵️", {
        description:
          "He's close, but that's not his exact spot! Try zooming in.",
      });
    } else {
      toast.error(`Whoops! Not ${character}!`, {
        description: "That's a good spot, but Waldo is still out there!",
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
