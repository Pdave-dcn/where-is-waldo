import { createContext } from "react";

export interface AvailableImage {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface CharacterLocation {
  id: string;
  characterName: string;
  targetXRatio: number;
  targetYRatio: number;
  toleranceXRatio: number;
  toleranceYRatio: number;
}

export interface ImageData {
  id: string;
  name: string;
  url: string;
  description: string;
  originalWidth: number;
  originalHeight: number;
  characterLocations: CharacterLocation[];
}

export interface Leaderboard {
  id: string;
  playerName: string;
  timeTakenSeconds: number;
  completedAt: string;
}

export interface GameDataContextType {
  gameCompletionLoading: boolean;
  gameCompletionError: Error | null;
  createGameCompletion: (secondsTaken: number, playerName: string) => void;

  leaderboardLoading: boolean;
  leaderboardError: Error | null;
  leaderboardData: Leaderboard[] | null;
  fetchLeaderboardData: () => void;
}

export const GameDataContext = createContext<GameDataContextType | null>(null);
