import { motion, AnimatePresence } from "motion/react";
import { WinnerFormHeader } from "./WinnerFormHeader";
import { WinnerFormInput } from "./WinnerFormInput";
import { WinnerFormActions } from "./WinnerFormActions";
import { useWinnerForm } from "@/hooks/use-winnerForm";
import { formatTime } from "@/utils/formatTime.util";

const WinnerForm = () => {
  const {
    secondsTaken,
    name,
    setName,
    characterText,
    handleSubmit,
    isSubmitting,
  } = useWinnerForm();

  if (!secondsTaken) return null;

  return (
    <AnimatePresence>
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
          <WinnerFormHeader
            characterText={characterText}
            formattedTime={formatTime(secondsTaken)}
          />

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <WinnerFormInput name={name} onNameChange={setName} />

            <WinnerFormActions
              onSubmit={handleSubmit}
              disabled={!name.trim()}
              isSubmitting={isSubmitting}
            />
          </motion.form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WinnerForm;
