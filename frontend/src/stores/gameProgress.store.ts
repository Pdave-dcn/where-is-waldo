import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface GameProgressState {
  // State
  foundCharacters: Set<string>;
  gameCompleted: boolean;
  totalCharacters: number;
  availableCharacterNames: string[];

  // Actions
  markCharacterAsFound: (charName: string) => void;
  isCharacterFound: (charName: string) => boolean;
  areAllCharactersFound: () => boolean;
  resetGame: () => void;
  setTotalCharacters: (total: number) => void;
  setAvailableCharacterNames: (names: string[]) => void;
}

/**
 * Game progress store for tracking found characters and completion status.
 * Manages which characters have been discovered, validates findings against
 * available characters, and determines when all characters are found.
 */
export const useGameProgressStore = create<GameProgressState>()(
  devtools(
    (set, get) => ({
      // Initial state
      foundCharacters: new Set(),
      gameCompleted: false,
      totalCharacters: 0,
      availableCharacterNames: [],

      setAvailableCharacterNames: (names) => {
        set({ availableCharacterNames: names });
      },

      // Actions
      markCharacterAsFound: (charName) => {
        if (!get().availableCharacterNames.includes(charName)) {
          console.warn(
            `Character "${charName}" not found in current image data`
          );
          return;
        }

        set((state) => {
          const newFoundCharacters = new Set(state.foundCharacters);
          newFoundCharacters.add(charName);

          const gameCompleted =
            state.totalCharacters > 0 &&
            newFoundCharacters.size === state.totalCharacters;

          return {
            foundCharacters: newFoundCharacters,
            gameCompleted,
          };
        });
      },

      isCharacterFound: (charName) => {
        return get().foundCharacters.has(charName);
      },

      areAllCharactersFound: () => {
        const { foundCharacters, totalCharacters } = get();
        return totalCharacters > 0 && foundCharacters.size === totalCharacters;
      },

      resetGame: () => {
        set({
          foundCharacters: new Set(),
          gameCompleted: false,
        });
      },

      setTotalCharacters: (total) => {
        set({ totalCharacters: total });
      },
    }),
    { name: "GameProgress" }
  )
);
