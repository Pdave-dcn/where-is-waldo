import { useContext } from "react";
import { GameDataContext } from "@/contexts/GameDataContext";

export const useGameData = () => {
  const context = useContext(GameDataContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
