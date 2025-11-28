import { useState } from "react";
import { GameDataContext, type Leaderboard } from "./GameDataContext";

import { LeaderboardResponseSchema } from "@/zodSchemas/leaderboard.zod";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const GameDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [gameCompletionLoading, setGameCompletionLoading] = useState(true);
  const [gameCompletionError, setGameCompletionError] = useState<Error | null>(
    null
  );

  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [leaderboardError, setLeaderboardError] = useState<Error | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<Leaderboard[] | null>(
    null
  );

  const createGameCompletion = async (
    timeTakenSeconds: number,
    playerName: string
  ) => {
    setGameCompletionLoading(true);
    setGameCompletionError(null);

    const playerData = { timeTakenSeconds, playerName };

    try {
      const response = await fetch(
        `${API_BASE_URL}/image/imageId/game-completion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(playerData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
    } catch (error: unknown) {
      console.error("Error in creating new game completion:", error);
      if (error instanceof Error) {
        setGameCompletionError(error);
      } else {
        setGameCompletionError(new Error("An unexpected error occurred."));
      }
    } finally {
      setGameCompletionLoading(false);
    }
  };

  const fetchLeaderboardData = async () => {
    setLeaderboardLoading(true);
    setLeaderboardError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/image/imageId/game-completion`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to load image details: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      const validatedResponse = LeaderboardResponseSchema.parse(data);

      setLeaderboardData(validatedResponse.data);
    } catch (error: unknown) {
      console.error("Error fetching leaderboard data:", error);
      if (error instanceof Error) {
        setLeaderboardError(error);
      } else {
        setLeaderboardError(
          new Error("An unknown error occurred while loading the leaderboard.")
        );
      }
    } finally {
      setLeaderboardLoading(false);
    }
  };

  return (
    <GameDataContext.Provider
      value={{
        gameCompletionLoading,
        gameCompletionError,
        createGameCompletion,
        leaderboardLoading,
        leaderboardError,
        leaderboardData,
        fetchLeaderboardData,
      }}
    >
      {children}
    </GameDataContext.Provider>
  );
};
