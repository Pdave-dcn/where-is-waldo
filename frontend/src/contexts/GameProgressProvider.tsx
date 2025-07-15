import { useState, useEffect, useCallback, useMemo } from "react";
import { GameProgressContext } from "./GameProgressContext";
import { useGameData } from "@/hooks/use-GameData";

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

  const { imageData } = useGameData();

  useEffect(() => {
    if (imageData?.characterLocations) {
      setTotalCharacters(imageData.characterLocations.length);
    } else {
      setTotalCharacters(0);
    }
  }, [imageData]);

  useEffect(() => {
    if (totalCharacters > 0 && foundCharacters.size === totalCharacters) {
      setGameCompleted(true);
    }
  }, [foundCharacters, totalCharacters]);

  useEffect(() => {
    if (imageData) {
      resetGame();
    }
  }, [imageData]);

  const markCharacterAsFound = useCallback(
    (charName: string) => {
      if (
        !imageData?.characterLocations.some(
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
    [imageData]
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
      imageData?.characterLocations.map((char) => char.characterName) || []
    );
  }, [imageData]);

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
