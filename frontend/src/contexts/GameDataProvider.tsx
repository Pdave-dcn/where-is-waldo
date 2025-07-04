import { useEffect, useState } from "react";
import { z } from "zod";
import { GameDataContext, type ImageData } from "./GameDataContext";

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
  url: z.string().url(),
  originalWidth: z.number().int().positive(),
  originalHeight: z.number().int().positive(),
  characterLocations: z.array(CharacterLocationSchema),
});

const ServerResponseSchema = z.object({
  message: z.string(),
  image: ImageDataSchema,
});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const GameDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/image/0cf10bcd-b08a-4548-ab47-9058888100c6`
        );
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.status} ${response.statusText}`
          );
        }

        const rawData = await response.json();
        const validatedResponse = ServerResponseSchema.parse(rawData);

        setImageData(validatedResponse.image);
        setError(null);
      } catch (error: unknown) {
        console.error("Error fetching game data:", error);
        if (error instanceof z.ZodError) {
          setError(
            new Error(
              `Data validation failed: ${error.errors
                .map((e) => e.message)
                .join(", ")}`
            )
          );
        } else if (error instanceof Error) {
          setError(error);
        } else {
          setError(
            new Error("An unknown error occurred while fetching game data.")
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <GameDataContext.Provider value={{ imageData, error, loading }}>
      {children}
    </GameDataContext.Provider>
  );
};
