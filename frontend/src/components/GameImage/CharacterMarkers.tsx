import type { CharacterData } from "@/hooks/use-CharacterPositions";
import FoundMark from "../FoundMark";
import TargetBox from "../TargetBox";
import { useGameProgress } from "@/hooks/use-GameProgress";

interface Position {
  x: number;
  y: number;
}

interface CharacterMarkersProps {
  characters: CharacterData[];
  boxPosition: Position | null;
  showDropdown: boolean;
  onBoxClose: () => void;
}

export const CharacterMarkers = ({
  characters,
  boxPosition,
  showDropdown,
  onBoxClose,
}: CharacterMarkersProps) => {
  const { isCharacterFound } = useGameProgress();

  return (
    <>
      {characters.map((char) => {
        if (isCharacterFound(char.characterName)) {
          return (
            <FoundMark
              key={char.characterName}
              characterName={char.characterName}
              position={char.position}
            />
          );
        }
        return null;
      })}

      {boxPosition && showDropdown && (
        <TargetBox
          position={boxPosition}
          onClose={onBoxClose}
          characterData={characters}
        />
      )}
    </>
  );
};
