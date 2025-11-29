import type { CharacterData } from "@/hooks/use-CharacterPositions";
import FoundMark from "../FoundMark";
import TargetBox from "../TargetBox";
import { useGameProgress } from "@/hooks/use-GameProgress";
import { useGameUIStore } from "@/stores/gameUI.store";
import { GameActions } from "@/services/gameActions.service";

interface CharacterMarkersProps {
  characters: CharacterData[];
}

export const CharacterMarkers = ({ characters }: CharacterMarkersProps) => {
  const { boxPosition, showDropdown } = useGameUIStore();
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
          onClose={GameActions.closeTargetBox}
          characterData={characters}
        />
      )}
    </>
  );
};
