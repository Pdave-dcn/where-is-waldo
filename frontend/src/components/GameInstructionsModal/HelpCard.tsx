import { HelpCircle } from "lucide-react";
import { motion } from "motion/react";

interface HelpCardProps {
  delay?: number;
}

export const HelpCard = ({ delay = 0 }: HelpCardProps) => {
  return (
    <motion.div
      className="bg-amber-50 border border-amber-200 rounded-lg p-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <div className="flex items-start gap-2">
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.1 }}
        >
          <HelpCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
        </motion.div>
        <div>
          <motion.p
            className="text-amber-800 text-sm"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.2 }}
          >
            <strong>New to the game?</strong> Not sure how to play?
          </motion.p>
          <motion.p
            className="text-amber-700 text-sm mt-1"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.3 }}
          >
            Click the "How to Play" button below for detailed instructions and
            tips!
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
