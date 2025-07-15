import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";
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
      <DialogContent className="sm:max-w-md mx-4">
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
