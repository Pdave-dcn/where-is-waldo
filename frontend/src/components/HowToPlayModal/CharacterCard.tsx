import { motion } from "motion/react";
import type { Character } from "./howToPlayModalData";
import { parseMarkdownBold } from "@/utils/parseMarkdownBold.util";

export const CharacterCard = ({
  character,
  index,
}: {
  character: Character;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay: 2.1 + index * 0.1 }}
    whileHover={{
      x: 5,
      backgroundColor: "rgba(0, 0, 0, 0.02)",
      transition: { duration: 0.2 },
    }}
    className="p-2 rounded-lg transition-colors"
  >
    <motion.h4
      className="font-semibold text-lg mb-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        delay: 2.2 + index * 0.1,
      }}
    >
      {character.name}:
    </motion.h4>
    <motion.ul
      className="list-disc list-inside space-y-0.5 pl-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        delay: 2.3 + index * 0.1,
      }}
    >
      <motion.li
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          delay: 2.4 + index * 0.1,
        }}
      >
        <span className="font-medium">Signature Look:</span>{" "}
        {parseMarkdownBold(character.signatureLook)}
      </motion.li>
      <motion.li
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          delay: 2.5 + index * 0.1,
        }}
      >
        <span className="font-medium">Other Details:</span>{" "}
        {character.otherDetails}
      </motion.li>
    </motion.ul>
  </motion.div>
);
