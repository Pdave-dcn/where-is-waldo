import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, HelpCircle } from "lucide-react";
import { useGameProgress } from "@/hooks/use-GameProgress";
import { useState } from "react";

interface CharacterInfoModalProps {
  isOpen: boolean;
}

export const CharacterInfoModal = ({ isOpen }: CharacterInfoModalProps) => {
  const [open, setOpen] = useState(true);
  const { availableCharacters } = useGameProgress();

  const getCharacterEmoji = (character: string) => {
    switch (character.toLowerCase()) {
      case "waldo":
        return "🔴";
      case "odlaw":
        return "🟡";
      case "wenda":
        return "🔵";
      case "woof":
        return "🐕";
      case "wizard":
        return "🧙‍♂️";
      default:
        return "❓";
    }
  };

  return (
    <Dialog open={isOpen && open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-6 h-6" />
            Find These Characters
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            {availableCharacters.length === 1
              ? "In this image, you need to find:"
              : `In this image, you need to find all ${availableCharacters.length} characters:`}
          </p>

          <div className="flex flex-wrap gap-2">
            {availableCharacters.map((character) => (
              <Badge
                key={character}
                variant="outline"
                className="text-lg py-2 px-3 border"
              >
                {getCharacterEmoji(character)} {character}
              </Badge>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              💡 <strong>Tip:</strong> Click on a character when you spot them,
              then select their name from the dropdown menu!
            </p>
          </div>

          {/* New How to Play encouragement section */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-amber-800 text-sm">
                  <strong>New to the game?</strong> Not sure how to play?
                </p>
                <p className="text-amber-700 text-sm mt-1">
                  Click the "How to Play" button below for detailed instructions
                  and tips!
                </p>
              </div>
            </div>
          </div>

          <Button
            className="w-full font-bold py-3 px-6 rounded-full cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Got It!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
