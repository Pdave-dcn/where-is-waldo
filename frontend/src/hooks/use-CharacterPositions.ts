import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { toast } from "sonner";
import debounce from "lodash.debounce";
import { type ImageData } from "@/contexts/GameDataContext";

interface Position {
  x: number;
  y: number;
}

export interface CharacterData {
  characterName: "Waldo" | "Odlaw";
  position: Position;
  tolerance: Position;
}

// Custom hook for position calculations
const useCharacterPositions = (imageData: ImageData | null) => {
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);

  const calculatePositions = useCallback(() => {
    const imgElement = imageRef.current;

    if (!imgElement || !imageData) {
      console.warn(
        "Image element or image data not available for position calculation."
      );
      return;
    }

    const currentImageRect = imgElement.getBoundingClientRect();
    const currentDisplayedWidth = currentImageRect.width;
    const currentDisplayedHeight = currentImageRect.height;

    if (currentDisplayedWidth === 0 || currentDisplayedHeight === 0) {
      console.warn(
        "Image dimensions are zero, cannot calculate positions yet."
      );
      return;
    }

    try {
      const scaleX = currentDisplayedWidth / imageData.originalWidth;
      const scaleY = currentDisplayedHeight / imageData.originalHeight;

      const waldoData = imageData.characterLocations.find(
        (char) => char.characterName === "Waldo"
      );
      const odlawData = imageData.characterLocations.find(
        (char) => char.characterName === "Odlaw"
      );

      if (!waldoData || !odlawData) {
        console.error(
          "Required character data (Waldo/Odlaw) not found in imageData.characterLocations."
        );
        toast.error("Game Setup Error", {
          description: "Critical character data is missing for this image.",
          duration: 5000,
        });

        return;
      }

      const newCharacters: CharacterData[] = [
        {
          characterName: "Waldo",
          position: {
            x: waldoData.targetXRatio * imageData.originalWidth * scaleX,
            y: waldoData.targetYRatio * imageData.originalHeight * scaleY,
          },
          tolerance: {
            x: waldoData.toleranceXRatio * imageData.originalWidth * scaleX,
            y: waldoData.toleranceYRatio * imageData.originalHeight * scaleY,
          },
        },
        {
          characterName: "Odlaw",
          position: {
            x: odlawData.targetXRatio * imageData.originalWidth * scaleX,
            y: odlawData.targetYRatio * imageData.originalHeight * scaleY,
          },
          tolerance: {
            x: odlawData.toleranceXRatio * imageData.originalWidth * scaleX,
            y: odlawData.toleranceYRatio * imageData.originalHeight * scaleY,
          },
        },
      ];

      setCharacters(newCharacters);
    } catch (error: unknown) {
      console.error(
        "An unexpected error occurred while calculating character positions:",
        error
      );
      toast.error("Calculation Error", {
        description:
          "There was an unexpected issue calculating character positions. Please refresh.",
        duration: 5000,
      });
    }
  }, [imageData]);

  const debouncedCalculatePositions = useMemo(
    () => debounce(calculatePositions, 100),
    [calculatePositions]
  );

  useEffect(() => {
    const imgElement = imageRef.current;

    const handleLoad = () => calculatePositions();
    const handleResize = () => debouncedCalculatePositions();

    if (imgElement) {
      if (imgElement.complete) {
        calculatePositions();
      }
      imgElement.addEventListener("load", handleLoad);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      if (imgElement) {
        imgElement.removeEventListener("load", handleLoad);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [calculatePositions, debouncedCalculatePositions]);

  return { characters, imageRef };
};

export default useCharacterPositions;
