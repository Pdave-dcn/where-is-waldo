import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface GameProgressState {
  foundCharacters: Set<string>;
  notFoundCharacters: Set<string>;
  gameCompleted: boolean;
  totalCharacters: number;
  availableCharacterNames: string[];

  markCharacterAsFound: (charName: string) => void;
  isCharacterFound: (charName: string) => boolean;
  areAllCharactersFound: () => boolean;
  resetGame: () => void;
  setTotalCharacters: (total: number) => void;
  setAvailableCharacterNames: (names: string[]) => void;
}

export const useGameProgressStore = create<GameProgressState>()(
  devtools(
    (set, get) => ({
      foundCharacters: new Set<string>(),
      notFoundCharacters: new Set<string>(),
      gameCompleted: false,
      totalCharacters: 0,
      availableCharacterNames: [],

      setAvailableCharacterNames: (names: string[]) =>
        set(
          {
            availableCharacterNames: names,
            notFoundCharacters: new Set(names),
          },
          false,
          "Progress/setAvailableCharacterNames"
        ),

      markCharacterAsFound: (charName: string) => {
        if (!get().availableCharacterNames.includes(charName)) {
          console.warn(
            `Character "${charName}" not found in current image data`
          );
          return;
        }

        set(
          (state) => {
            const newFoundCharacters = new Set(state.foundCharacters);
            newFoundCharacters.add(charName);

            const newNotFoundCharacters = new Set(state.notFoundCharacters);
            newNotFoundCharacters.delete(charName);

            const gameCompleted =
              state.totalCharacters > 0 &&
              newFoundCharacters.size === state.totalCharacters;

            return {
              foundCharacters: newFoundCharacters,
              notFoundCharacters: newNotFoundCharacters,
              gameCompleted,
            };
          },
          false,
          `Progress/markCharacterAsFound: ${charName}`
        );
      },

      isCharacterFound: (charName: string) => get().foundCharacters.has(charName),

      areAllCharactersFound: () => {
        const { foundCharacters, totalCharacters } = get();
        return totalCharacters > 0 && foundCharacters.size === totalCharacters;
      },

      resetGame: () =>
        set(
          {
            foundCharacters: new Set<string>(),
            gameCompleted: false,
          },
          false,
          "Progress/resetGame"
        ),

      setTotalCharacters: (total: number) =>
        set({ totalCharacters: total }, false, "Progress/setTotalCharacters"),
    }),
    process.env.NODE_ENV === "development" ? { name: "GameProgress" } : {}
  )
);
