import { createContext } from "react";

export interface GameProgressContextType {
  foundCharacters: Set<string>;
  gameCompleted: boolean;
  totalCharacters: number;

  markCharacterAsFound: (name: string) => void;
  isCharacterFound: (name: string) => boolean;
  areAllCharactersFound: () => boolean;
  resetGame: () => void;

  availableCharacters: string[];
}

export const GameProgressContext =
  createContext<GameProgressContextType | null>(null);
