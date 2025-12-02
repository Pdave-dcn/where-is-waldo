import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface WinnerFormActionsProps {
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
  isSubmitting: boolean;
}

export const WinnerFormActions = ({
  onSubmit,
  disabled,
  isSubmitting,
}: WinnerFormActionsProps) => {
  return (
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
          disabled={disabled || isSubmitting}
          onClick={onSubmit}
        >
          {isSubmitting && !disabled ? (
            <RotateCcw className="animate-spin" />
          ) : null}
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
          className="flex-1 w-full cursor-pointer"
          disabled={isSubmitting}
          onClick={onSubmit}
        >
          {isSubmitting && disabled ? (
            <RotateCcw className="animate-spin" />
          ) : null}
          Skip
        </Button>
      </motion.div>
    </motion.div>
  );
};
