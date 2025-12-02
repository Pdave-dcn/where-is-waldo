import CharacterList from "./CharacterList";
import { type CharacterData } from "@/hooks/use-CharacterPositions";
import { useTargetBox } from "@/hooks/use-targetBox";

interface TargetBoxProps {
  characterData: CharacterData[];
}

const TargetBox = ({ characterData }: TargetBoxProps) => {
  const {
    targetRef,
    onCharacterClick,
    boxPosition: position,
  } = useTargetBox({
    characterData,
  });

  return (
    <div
      ref={targetRef}
      className={`absolute z-50 transition-all duration-200 ${
        position ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={{
        left: `${position?.x}px`,
        top: `${position?.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white animate-pulse" />
        <div className="absolute inset-0 w-16 h-16 border-2 border-white" />
      </div>

      <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
        <CharacterList onCharacterClick={onCharacterClick} />
      </div>
    </div>
  );
};

export default TargetBox;
