import { motion } from "motion/react";
import { SectionTitle } from "./SectionTitle";

export const CharacterReferenceSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1.2 }}
  >
    <SectionTitle
      emoji="📸"
      title="Character Reference"
      delay={1.3}
      emojiRotation={-45}
    />
    <motion.div
      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 1.5 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <motion.p
        className="text-gray-700 mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.6 }}
      >
        Here's a visual reference of all the characters you need to find:
      </motion.p>
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.7 }}
      >
        <motion.img
          src="/where-is-waldo-characters.png"
          alt="Where's Waldo characters reference showing Waldo, Odlaw, Wenda, Woof, and Wizard Whitebeard"
          className="max-w-full h-auto rounded-lg shadow-md"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
        />
      </motion.div>
    </motion.div>
  </motion.div>
);
