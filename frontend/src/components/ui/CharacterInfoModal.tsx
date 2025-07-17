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
import { motion } from "motion/react";

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Target className="w-6 h-6" />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Find These Characters
              </motion.span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {availableCharacters.length === 1
                ? "In this image, you need to find:"
                : `In this image, you need to find all ${availableCharacters.length} characters:`}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {availableCharacters.map((character, index) => (
                <motion.div
                  key={character}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.6 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Badge
                    variant="outline"
                    className="text-lg py-2 px-3 border cursor-pointer"
                  >
                    <motion.span
                      initial={{ rotate: -10 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    >
                      {getCharacterEmoji(character)}
                    </motion.span>{" "}
                    {character}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="bg-blue-50 border border-blue-200 rounded-lg p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <motion.p
                className="text-blue-800 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.9 }}
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.0 }}
                  className="inline-block"
                >
                  💡
                </motion.span>{" "}
                <strong>Tip:</strong> Click on a character when you spot them,
                then select their name from the dropdown menu!
              </motion.p>
            </motion.div>

            <motion.div
              className="bg-amber-50 border border-amber-200 rounded-lg p-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <div className="flex items-start gap-2">
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4, delay: 1.1 }}
                >
                  <HelpCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                </motion.div>
                <div>
                  <motion.p
                    className="text-amber-800 text-sm"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                  >
                    <strong>New to the game?</strong> Not sure how to play?
                  </motion.p>
                  <motion.p
                    className="text-amber-700 text-sm mt-1"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.3 }}
                  >
                    Click the "How to Play" button below for detailed
                    instructions and tips!
                  </motion.p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <Button
                className="w-full font-bold py-3 px-6 rounded-full cursor-pointer"
                onClick={() => setOpen(false)}
                asChild
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1 },
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.5 }}
                  >
                    Got It!
                  </motion.span>
                </motion.button>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
