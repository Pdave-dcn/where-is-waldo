import { motion } from "motion/react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export const ModalHeader = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    className="flex justify-between items-center p-6 sm:p-8 pb-4 border-b flex-shrink-0"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.2 }}
  >
    <motion.h2
      className="text-3xl font-extrabold"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      How to Play
    </motion.h2>
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      whileHover={{ scale: 1.1 }}
    >
      <Button
        variant="ghost"
        onClick={onClose}
        className="p-1 rounded-full cursor-pointer"
        aria-label="Close how to play instructions"
      >
        <X className="w-7 h-7" />
      </Button>
    </motion.div>
  </motion.div>
);
