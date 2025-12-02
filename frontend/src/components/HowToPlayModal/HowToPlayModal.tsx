import { motion, AnimatePresence } from "motion/react";
import { ModalHeader } from "./ModalHeader";
import { ObjectiveSection } from "./ObjectiveSection";
import { GameInstructionsSection } from "./GameInstructionsSection";
import { CharacterReferenceSection } from "./CharacterReferenceSection";
import { CharacterDescriptionsSection } from "./CharacterDescriptionsSection";
import { ImportantNotesSection } from "./ImportantNotesSection";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToPlayModal = ({ isOpen, onClose }: HowToPlayModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-background rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader onClose={onClose} />

            <div className="overflow-y-auto flex-1 p-6 sm:p-8 pt-6">
              <div className="space-y-6">
                <ObjectiveSection />
                <GameInstructionsSection />
                <CharacterReferenceSection />
                <CharacterDescriptionsSection />
                <ImportantNotesSection />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HowToPlayModal;
