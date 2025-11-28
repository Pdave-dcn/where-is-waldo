import { motion } from "motion/react";

export const ImageSelectorHeader = () => {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        className="text-4xl font-bold mb-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Choose Your Challenge
      </motion.h2>
      <motion.p
        className="text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Select an image to start your Waldo hunting adventure!
      </motion.p>
    </motion.div>
  );
};
