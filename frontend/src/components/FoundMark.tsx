import { CheckCircle2 } from "lucide-react";

interface FoundMarkProps {
  position: { x: number; y: number };
  characterName: string;
}

const CHARACTER_COLORS: Record<string, string> = {
  Waldo: "rgba(0, 128, 0, 0.7)",
  Odlaw: "rgba(128, 0, 0, 0.7)",
  Wizard: "rgba(0, 0, 128, 0.7)",
  Wenda: "rgba(128, 0, 128, 0.7)",
  Woof: "rgba(255, 255, 255, 0.7)",
};

const FoundMark = ({ position, characterName }: FoundMarkProps) => {
  const ICON_SIZE = 24;
  const OFFSET = ICON_SIZE / 2;

  const getCharacterColor = (name: string) => {
    return CHARACTER_COLORS[name] || "rgba(100, 100, 100, 0.7)";
  };

  return (
    <div
      className="absolute flex items-center justify-center p-0.5 rounded-full"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-${OFFSET}px, -${OFFSET}px)`,
        zIndex: 40,
        backgroundColor: getCharacterColor(characterName),
        border: "2px solid white",
        boxShadow: "0 0 5px rgba(0,0,0,0.5)",
      }}
    >
      <CheckCircle2 size={ICON_SIZE} color="white" />
      <span className="text-white text-xs font-bold ml-1">{characterName}</span>
    </div>
  );
};

export default FoundMark;
