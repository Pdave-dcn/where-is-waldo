import { motion } from "motion/react";
import { SectionTitle } from "./SectionTitle";

export const ObjectiveSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    <SectionTitle
      emoji="🎯"
      title="Your Objective"
      delay={0.5}
      emojiRotation={-180}
    />
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.7 }}
    >
      Find and click on <strong>Waldo</strong>, <strong>Odlaw</strong>,{" "}
      <strong>Wenda</strong>, <strong>Woof</strong>, and{" "}
      <strong>Wizard Whitebeard</strong> in the crowded scene, if they are
      present, as quickly as possible! Your goal is to find <em>all</em> of them
      to complete the game.
    </motion.p>
  </motion.div>
);
