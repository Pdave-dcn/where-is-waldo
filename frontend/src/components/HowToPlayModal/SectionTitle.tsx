import { motion } from "motion/react";

export const SectionTitle = ({
  emoji,
  title,
  delay,
  emojiRotation = 0,
}: {
  emoji: string;
  title: string;
  delay: number;
  emojiRotation?: number;
}) => (
  <motion.h3
    className="font-bold text-xl mb-2 flex items-center gap-2"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <motion.span
      role="img"
      aria-label={title}
      initial={{ scale: 0, rotate: emojiRotation }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.5, delay: delay + 0.1 }}
    >
      {emoji}
    </motion.span>
    {title}
  </motion.h3>
);
