import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGameData } from "@/hooks/use-GameData";
import { useGameProgress } from "@/hooks/use-GameProgress";
import { motion, AnimatePresence } from "motion/react";

interface WinnerFormProps {
  secondsTaken: number | null;
}

const WinnerForm = ({ secondsTaken }: WinnerFormProps) => {
  const [name, setName] = useState("");
  const { createGameCompletion } = useGameData();

  const { totalCharacters, availableCharacters } = useGameProgress();

  const characterNumber =
    totalCharacters > 1
      ? `all ${totalCharacters} characters`
      : availableCharacters.length === 1
      ? `${availableCharacters[0]}`
      : "";

  const navigate = useNavigate();

  if (!secondsTaken) return;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (secondsTaken) {
      createGameCompletion(secondsTaken, name);
      navigate("/leaderboard");
    }
  };

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60)
      .toString()
      .padStart(2, "0")}`;
  };

  if (!secondsTaken) {
    return;
  }

  return (
    <AnimatePresence>
      {secondsTaken && (
        <motion.div
          className="fixed inset-0 bg-background/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-background rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
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
                {`You found ${characterNumber} in: `}
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
                  {formatTime(secondsTaken)}
                </motion.span>
              </motion.p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
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
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full"
                    maxLength={20}
                  />
                </motion.div>
              </motion.div>

              <motion.div
                className="flex space-x-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.1 }}
              >
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white w-full cursor-pointer"
                    disabled={!name.trim()}
                    onClick={() => handleSubmit}
                  >
                    Save Score
                  </Button>
                </motion.div>
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    variant="outline"
                    onClick={() => handleSubmit}
                    className="flex-1 w-full cursor-pointer"
                  >
                    Skip
                  </Button>
                </motion.div>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WinnerForm;
