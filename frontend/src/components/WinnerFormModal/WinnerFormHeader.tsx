import { motion } from "motion/react";

interface WinnerFormHeaderProps {
  characterText: string;
  formattedTime: string;
}

export const WinnerFormHeader = ({
  characterText,
  formattedTime,
}: WinnerFormHeaderProps) => {
  return (
    <motion.div
      className="text-center mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <motion.h2
        className="text-3xl font-bold text-green-600 mb-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.3,
          type: "spring",
          stiffness: 200,
        }}
      >
        🎉 Congratulations!
      </motion.h2>
      <motion.p
        className="text-secondary-foreground text-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        {`You found ${characterText} in: `}
        <motion.span
          className="font-bold text-green-600"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.6,
            type: "spring",
            stiffness: 200,
          }}
        >
          {formattedTime}
        </motion.span>
      </motion.p>
    </motion.div>
  );
};
