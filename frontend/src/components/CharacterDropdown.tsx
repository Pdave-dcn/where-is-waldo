import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface CharacterDropdownProps {
  onCharacterClick: (character: string) => void;
}

const characters = ["Waldo", "Wenda", "Odlaw", "Wizard Whitebeard"];

const CharacterDropdown = ({ onCharacterClick }: CharacterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Effect to handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleTriggerClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (character: string) => {
    onCharacterClick(character);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative min-w-48">
      <button
        type="button"
        onClick={handleTriggerClick}
        className="flex gap-1 items-center px-3 py-1 bg-background shadow-xl rounded-xl w-full justify-between"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Who did you find?
        <ChevronDown
          size={20}
          className={`${isOpen ? "rotate-180" : ""} transition-transform`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-background rounded-md shadow-lg py-1 z-20">
          {characters.map((character) => (
            <div
              key={character}
              onClick={() => handleItemClick(character)}
              className="px-4 py-2 cursor-pointer hover:bg-accent"
              role="menuitem"
            >
              {character}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterDropdown;
