import { useState, useEffect, useCallback, useMemo } from "react";
import { GameProgressContext } from "./GameProgressContext";
import { useGameDataStore } from "@/stores/gameData.store";

export const GameProgressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [foundCharacters, setFoundCharacters] = useState<Set<string>>(
    new Set()
  );
  const [gameCompleted, setGameCompleted] = useState(false);
  const [totalCharacters, setTotalCharacters] = useState(0);

  const { selectedImageData } = useGameDataStore();

  useEffect(() => {
    if (selectedImageData?.characterLocations) {
      setTotalCharacters(selectedImageData.characterLocations.length);
    } else {
      setTotalCharacters(0);
    }
  }, [selectedImageData]);

  useEffect(() => {
    if (totalCharacters > 0 && foundCharacters.size === totalCharacters) {
      setGameCompleted(true);
    }
  }, [foundCharacters, totalCharacters]);

  useEffect(() => {
    if (selectedImageData) {
      resetGame();
    }
  }, [selectedImageData]);

  const markCharacterAsFound = useCallback(
    (charName: string) => {
      if (
        !selectedImageData?.characterLocations.some(
          (char) => char.characterName === charName
        )
      ) {
        console.warn(`Character "${charName}" not found in current image data`);
        return;
      }

      setFoundCharacters((prev) => {
        const newSet = new Set(prev);
        newSet.add(charName);
        return newSet;
      });
    },
    [selectedImageData]
  );

  const isCharacterFound = useCallback(
    (charName: string): boolean => {
      return foundCharacters.has(charName);
    },
    [foundCharacters]
  );

  const areAllCharactersFound = useCallback((): boolean => {
    return totalCharacters > 0 && foundCharacters.size === totalCharacters;
  }, [foundCharacters, totalCharacters]);

  const resetGame = useCallback(() => {
    setFoundCharacters(new Set());
    setGameCompleted(false);
  }, []);

  const availableCharacters = useMemo(() => {
    return (
      selectedImageData?.characterLocations.map((char) => char.characterName) ||
      []
    );
  }, [selectedImageData]);

  const contextValue = useMemo(
    () => ({
      foundCharacters,
      gameCompleted,
      totalCharacters,

      markCharacterAsFound,
      isCharacterFound,
      areAllCharactersFound,
      resetGame,

      availableCharacters,
    }),
    [
      foundCharacters,
      gameCompleted,
      totalCharacters,
      markCharacterAsFound,
      isCharacterFound,
      areAllCharactersFound,
      resetGame,
      availableCharacters,
    ]
  );

  return (
    <GameProgressContext.Provider value={contextValue}>
      {children}
    </GameProgressContext.Provider>
  );
};
