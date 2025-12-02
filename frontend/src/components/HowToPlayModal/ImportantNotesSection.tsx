import { motion } from "motion/react";
import { importantNotes } from "./howToPlayModalData";
import { parseMarkdownBold } from "@/utils/parseMarkdownBold.util";

export const ImportantNotesSection = () => (
  <motion.div
    className="mt-6 pt-4 border-t"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 2.8 }}
  >
    <motion.h4
      className="font-semibold text-lg mb-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 2.9 }}
    >
      Important Notes:
    </motion.h4>
    <motion.ul
      className="list-disc list-inside space-y-1 pl-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 3.0 }}
    >
      {importantNotes.map((note: string, index: number) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 3.1 + index * 0.1 }}
          whileHover={{ x: 5, transition: { duration: 0.2 } }}
        >
          {parseMarkdownBold(note)}
        </motion.li>
      ))}
    </motion.ul>
  </motion.div>
);
