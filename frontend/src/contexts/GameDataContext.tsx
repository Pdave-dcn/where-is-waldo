import { useEffect, useState, createContext } from "react";
import { z } from "zod";

interface CharacterLocation {
  id: string;
  characterName: string;
  targetXRatio: number;
  targetYRatio: number;
  toleranceXRatio: number;
  toleranceYRatio: number;
}

interface ImageData {
  id: string;
  name: string;
  url: string;
  originalWidth: number;
  originalHeight: number;
  characterLocations: CharacterLocation[];
}

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

interface GameDataContextType {
  imageData: ImageData | null;
  loading: boolean;
  error: Error | null;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const GameDataContext = createContext<GameDataContextType | null>(null);

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
        console.log("Raw server response:", rawData);

        const validatedResponse = ServerResponseSchema.parse(rawData);

        setImageData(validatedResponse.image);
        setError(null);
      } catch (err: unknown) {
        console.error("Error fetching game data:", err);
        if (err instanceof z.ZodError) {
          setError(
            new Error(
              `Data validation failed: ${err.errors
                .map((e) => e.message)
                .join(", ")}`
            )
          );
        } else if (err instanceof Error) {
          setError(err);
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
