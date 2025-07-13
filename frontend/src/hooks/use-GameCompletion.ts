import { useState, useEffect } from "react";
import { toast } from "sonner";

const useGameCompletion = (
  isWaldoFound: boolean,
  isOdlawFound: boolean,
  timerRef: React.RefObject<{ stop: () => number; reset: () => void } | null>,
  setGameEnded: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [secondsTaken, setSecondsTaken] = useState<number | null>(null);

  useEffect(() => {
    if (isWaldoFound && isOdlawFound) {
      toast.success("Game complete", {
        description: "You've found both Waldo and Odlaw!!",
      });
      const time = timerRef.current?.stop();
      setSecondsTaken(time ?? null);
      setGameEnded(true);
    }
  }, [isWaldoFound, isOdlawFound, timerRef, setGameEnded]);

  return secondsTaken;
};

export default useGameCompletion;
