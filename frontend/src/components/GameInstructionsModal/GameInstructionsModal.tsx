import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";
import { motion } from "motion/react";
import { useGameDataStore } from "@/stores/gameData.store";
import { CharacterBadgeList } from "./CharacterBadgeList";
import { TipCard } from "./TipCard";
import { HelpCard } from "./HelpCard";
import { useGameUIStore } from "@/stores/gameUI.store";

export const GameInstructionsModal = () => {
  const { showInfoModal, setShowInfoModal } = useGameUIStore();
  const { selectedImageData } = useGameDataStore();

  const availableCharacters =
    selectedImageData?.characterLocations.map((char) => char.characterName) ||
    [];

  return (
    <Dialog open={showInfoModal} onOpenChange={() => {}}>
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

            <CharacterBadgeList characters={availableCharacters} />

            <TipCard delay={0.8} />

            <HelpCard delay={1.0} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <Button
                className="w-full font-bold py-3 px-6 rounded-full cursor-pointer"
                onClick={() => setShowInfoModal(false)}
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
