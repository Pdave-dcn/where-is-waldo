import { useEffect, useState, createContext } from "react";

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

interface GameDataContextType {
  imageData: ImageData | null;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const GameDataContext = createContext<GameDataContextType | null>(null);

export const GameDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/image`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setImageData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <GameDataContext.Provider value={{ imageData }}>
      {children}
    </GameDataContext.Provider>
  );
};
