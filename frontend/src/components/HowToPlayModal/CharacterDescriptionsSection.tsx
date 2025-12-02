import { CharacterCard } from "./CharacterCard";
import { characters, type Character } from "./howToPlayModalData";
import { SectionTitle } from "./SectionTitle";
import { motion } from "motion/react";

export const CharacterDescriptionsSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1.8 }}
  >
    <SectionTitle
      emoji="👀"
      title="Character Descriptions & Tips"
      delay={1.9}
      emojiRotation={180}
    />
    <div className="space-y-4">
      {characters.map((character: Character, index: number) => (
        <CharacterCard key={index} character={character} index={index} />
      ))}
    </div>
  </motion.div>
);
