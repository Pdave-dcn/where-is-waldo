import { motion } from "motion/react";
import { SectionTitle } from "./SectionTitle";
import { gameInstructions } from "./howToPlayModalData";
import { parseMarkdownBold } from "@/utils/parseMarkdownBold.util";

export const GameInstructionsSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.6 }}
  >
    <SectionTitle
      emoji="🎮"
      title="Game Instructions"
      delay={0.7}
      emojiRotation={90}
    />
    <motion.ol
      className="list-decimal list-inside space-y-2 pl-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.9 }}
    >
      {gameInstructions.map((instruction: string, index: number) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.9 + index * 0.1,
          }}
          whileHover={{ x: 5, transition: { duration: 0.2 } }}
        >
          {parseMarkdownBold(instruction)}
        </motion.li>
      ))}
    </motion.ol>
  </motion.div>
);
