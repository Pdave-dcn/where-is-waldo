import { useRef, useEffect } from "react";
import { useGameUIStore } from "@/stores/gameUI.store";
import { Search } from "lucide-react";
import { useGameProgressStore } from "@/stores/gameProgress.store";

interface CharacterDropdownProps {
  onCharacterClick: (character: string) => void;
}

const CharacterDropdown = ({ onCharacterClick }: CharacterDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { showDropdown, setShowDropdown } = useGameUIStore();
  const { notFoundCharacters } = useGameProgressStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, setShowDropdown]);

  const handleItemClick = (character: string) => {
    onCharacterClick(character);
    setShowDropdown(false);
  };

  return (
    <div ref={dropdownRef} className="relative min-w-56">
      <button
        type="button"
        className="flex gap-2 items-center justify-center px-4 py-2.5 bg-background shadow-xl rounded-xl w-full border-2 border-primary/20 hover:border-primary/40 transition-colors font-medium"
        aria-expanded={showDropdown}
        aria-haspopup="true"
      >
        <Search className="w-4 h-4" />
        Who did you find?
      </button>

      {showDropdown && (
        <div className="absolute top-full left-0 mt-2 w-full bg-background rounded-xl shadow-2xl border-2 border-border overflow-hidden z-20">
          <div className="py-2">
            {Array.from(notFoundCharacters).map((character, index) => (
              <div key={character}>
                <div
                  onClick={() => handleItemClick(character)}
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
      )}
    </div>
  );
};

export default CharacterDropdown;
