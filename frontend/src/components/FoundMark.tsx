import React from "react";
import { CheckCircle2 } from "lucide-react";

interface FoundMarkProps {
  position: { x: number; y: number };
  characterName: string;
}

const FoundMark: React.FC<FoundMarkProps> = ({ position, characterName }) => {
  const iconSize = 24;
  const offset = iconSize / 2;

  return (
    <div
      className="absolute flex items-center justify-center p-0.5 rounded-full"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-${offset}px, -${offset}px)`,
        zIndex: 40,
        backgroundColor:
          characterName === "Waldo"
            ? "rgba(0, 128, 0, 0.7)"
            : "rgba(128, 0, 0, 0.7)",
        border: "2px solid white",
        boxShadow: "0 0 5px rgba(0,0,0,0.5)",
      }}
    >
      <CheckCircle2 size={iconSize} color="white" />

      <span className="text-white text-xs font-bold ml-1">
        {characterName.charAt(0)}
      </span>
    </div>
  );
};

export default FoundMark;
