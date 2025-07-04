import { createContext } from "react";

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
  originalWidth: number;
  originalHeight: number;
  characterLocations: CharacterLocation[];
}

export interface GameDataContextType {
  imageData: ImageData | null;
  loading: boolean;
  error: Error | null;
}

export const GameDataContext = createContext<GameDataContextType | null>(null);
