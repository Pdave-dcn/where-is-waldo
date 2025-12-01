import type { CharacterData } from "@/hooks/use-CharacterPositions";
import FoundMark from "../FoundMark";
import { useGameProgressStore } from "@/stores/gameProgress.store";

interface CharacterMarkersProps {
  characterData: CharacterData[];
}

export const CharacterMarkers = ({ characterData }: CharacterMarkersProps) => {
  const { isCharacterFound } = useGameProgressStore();

  return (
    <>
      {characterData.map((char) =>
        isCharacterFound(char.characterName) ? (
          <FoundMark
            key={char.characterName}
            characterName={char.characterName}
            position={char.position}
          />
        ) : null
      )}
    </>
  );
};
