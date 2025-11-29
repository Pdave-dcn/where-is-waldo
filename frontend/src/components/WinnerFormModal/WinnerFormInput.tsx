import { motion } from "motion/react";
import { Input } from "@/components/ui/input";

interface WinnerFormInputProps {
  name: string;
  onNameChange: (name: string) => void;
}

export const WinnerFormInput = ({
  name,
  onNameChange,
}: WinnerFormInputProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.8 }}
    >
      <motion.label
        htmlFor="playerName"
        className="block text-sm font-medium mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.9 }}
      >
        Enter your name to save your score:
      </motion.label>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 1.0 }}
        whileFocus={{ scale: 1.02 }}
      >
        <Input
          id="playerName"
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Your name"
          className="w-full"
          maxLength={20}
        />
      </motion.div>
    </motion.div>
  );
};
