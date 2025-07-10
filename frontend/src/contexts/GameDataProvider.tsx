import { useEffect, useState } from "react";
import { z } from "zod";
import {
  GameDataContext,
  type ImageData,
  type AvailableImage,
  type Leaderboard,
} from "./GameDataContext";

const CharacterLocationSchema = z.object({
  id: z.string(),
  characterName: z.string(),
  targetXRatio: z.number(),
  targetYRatio: z.number(),
  toleranceXRatio: z.number(),
  toleranceYRatio: z.number(),
});

const ImageDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  url: z.string().url(),
  originalWidth: z.number().int().positive(),
  originalHeight: z.number().int().positive(),
  characterLocations: z.array(CharacterLocationSchema),
});

const ServerResponseSchema = z.object({
  message: z.string(),
  image: ImageDataSchema,
});

const AvailableImageSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string().url(),
  description: z.string(),
});

const AllImagesResponseSchema = z.object({
  message: z.string(),
  images: z.array(AvailableImageSchema),
});

const LeaderboardSchema = z.object({
  id: z.string(),
  playerName: z.string(),
  timeTakenSeconds: z.number(),
  completedAt: z.string(),
});

const LeaderboardResponseSchema = z.object({
  message: z.string(),
  leaderboard: z.array(LeaderboardSchema),
});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const GameDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allAvailableImages, setAllAvailableImages] = useState<
    AvailableImage[] | null
  >(null);
  const [allImagesLoading, setAllImagesLoading] = useState(true);
  const [allImagesError, setAllImagesError] = useState<Error | null>(null);

  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [selectedImageLoading, setSelectedImageLoading] = useState(true);
  const [selectedImageError, setSelectedImageError] = useState<Error | null>(
    null
  );

  const [imageData, setImageData] = useState<ImageData | null>(null);

  const [gameCompletionLoading, setGameCompletionLoading] = useState(true);
  const [gameCompletionError, setGameCompletionError] = useState<Error | null>(
    null
  );

  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [leaderboardError, setLeaderboardError] = useState<Error | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<Leaderboard[] | null>(
    null
  );

  useEffect(() => {
    const fetchAllImages = async () => {
      setAllImagesLoading(true);
      setAllImagesError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/images`);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.status} ${response.statusText}`
          );
        }

        const rawData = await response.json();
        const validatedResponse = AllImagesResponseSchema.parse(rawData);

        setAllAvailableImages(validatedResponse.images);
        setAllImagesError(null);
      } catch (error: unknown) {
        console.error("Error fetching game data:", error);
        if (error instanceof z.ZodError) {
          setAllImagesError(
            new Error(
              `Data validation failed: ${error.errors
                .map((e) => e.message)
                .join(", ")}`
            )
          );
        } else if (error instanceof Error) {
          setAllImagesError(error);
        } else {
          setAllImagesError(
            new Error("An unknown error occurred while fetching game data.")
          );
        }
      } finally {
        setAllImagesLoading(false);
      }
    };
    fetchAllImages();
  }, []);

  const selectImage = async (imageId: string) => {
    setSelectedImageId(imageId);
    setSelectedImageLoading(true);
    setSelectedImageError(null);
    setImageData(null);

    try {
      const response = await fetch(`${API_BASE_URL}/image/${imageId}`);
      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }

      const rawData = await response.json();
      const validatedResponse = ServerResponseSchema.parse(rawData);

      setImageData(validatedResponse.image);
      setSelectedImageError(null);
    } catch (error: unknown) {
      console.error(
        `Error fetching selected image data for ID ${imageId}:`,
        error
      );
      if (error instanceof z.ZodError) {
        setSelectedImageError(
          new Error(
            `Data validation failed: ${error.errors
              .map((e) => e.message)
              .join(", ")}`
          )
        );
      } else if (error instanceof Error) {
        setSelectedImageError(error);
      } else {
        setSelectedImageError(
          new Error("An unknown error occurred while fetching game data.")
        );
      }
    } finally {
      setSelectedImageLoading(false);
    }
  };

  const createGameCompletion = async (
    timeTakenSeconds: number,
    playerName: string
  ) => {
    setGameCompletionLoading(true);
    setGameCompletionError(null);

    const playerData = { timeTakenSeconds, playerName };

    try {
      const response = await fetch(
        `${API_BASE_URL}/image/${selectedImageId}/game-completion`,
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
    if (!selectedImageId) {
      setLeaderboardLoading(false);
      return;
    }

    setLeaderboardLoading(true);
    setLeaderboardError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/image/${selectedImageId}/game-completion`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to load image details: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      const validatedResponse = LeaderboardResponseSchema.parse(data);

      setLeaderboardData(validatedResponse.leaderboard);
    } catch (error: unknown) {
      console.error("Error fetching leaderboard data:", error);
      if (error instanceof Error) {
        setLeaderboardError(error);
      } else if (error instanceof z.ZodError) {
        setSelectedImageError(
          new Error(
            `Data validation failed: ${error.errors
              .map((e) => e.message)
              .join(", ")}`
          )
        );
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
        allAvailableImages,
        allImagesError,
        allImagesLoading,
        selectedImageId,
        setSelectedImageId,
        selectImage,
        imageData,
        selectedImageLoading,
        selectedImageError,
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
