import { memo } from "react";
import type { CharacterData } from "@/hooks/use-CharacterPositions";
import FoundMark from "../FoundMark";
import { useGameProgressStore } from "@/stores/gameProgress.store";

interface CharacterMarkersProps {
  characterData: CharacterData[];
}

const CharacterMarkersComponent = ({ characterData }: CharacterMarkersProps) => {
  const foundCharacters = useGameProgressStore((s) => s.foundCharacters);

  return (
    <>
      {characterData.map((char) =>
        foundCharacters.has(char.characterName) ? (
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

export const CharacterMarkers = memo(CharacterMarkersComponent);
