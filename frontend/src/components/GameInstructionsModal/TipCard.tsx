import { motion } from "motion/react";

interface TipCardProps {
  delay?: number;
}

export const TipCard = ({ delay = 0 }: TipCardProps) => {
  return (
    <motion.div
      className="bg-blue-50 border border-blue-200 rounded-lg p-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <motion.p
        className="text-blue-800 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.1 }}
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
          className="inline-block"
        >
          💡
        </motion.span>{" "}
        <strong>Tip:</strong> Click on a character when you spot them, then
        select their name from the dropdown menu!
      </motion.p>
    </motion.div>
  );
};
