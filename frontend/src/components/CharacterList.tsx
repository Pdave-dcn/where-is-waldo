import { Search } from "lucide-react";
import { useGameProgressStore } from "@/stores/gameProgress.store";

interface CharacterListProps {
  onCharacterClick: (character: string) => void;
}

const CharacterList = ({ onCharacterClick }: CharacterListProps) => {
  const { notFoundCharacters } = useGameProgressStore();

  return (
    <div className="relative min-w-56">
      <button
        type="button"
        className="flex gap-2 items-center justify-center px-4 py-2.5 bg-background shadow-xl rounded-xl w-full border-2 border-primary/20 hover:border-primary/40 transition-colors font-medium"
        aria-haspopup="true"
      >
        <Search className="w-4 h-4" />
        Who did you find?
      </button>

      {
        <div className="absolute top-full left-0 mt-2 w-full bg-background rounded-xl shadow-2xl border-2 border-border overflow-hidden z-20">
          <div className="py-2">
            {Array.from(notFoundCharacters).map((character, index) => (
              <div key={character}>
                <div
                  onClick={() => onCharacterClick(character)}
                  className="px-4 py-3 cursor-pointer hover:bg-primary/10 transition-colors flex items-center gap-3 group"
                  role="menuitem"
                >
                  <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all" />
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {character}
                  </span>
                </div>
                {index < Array.from(notFoundCharacters).length - 1 && (
                  <div className="mx-4 border-b border-border/50" />
                )}
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default CharacterList;
