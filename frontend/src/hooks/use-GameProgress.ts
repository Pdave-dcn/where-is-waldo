import { useContext } from "react";
import { GameProgressContext } from "@/contexts/GameProgressContext";

export const useGameProgress = () => {
  const context = useContext(GameProgressContext);

  if (!context) {
    throw new Error("useGameProgress must be used within GameProgressProvider");
  }

  return context;
};
