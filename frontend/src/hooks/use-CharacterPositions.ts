import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useGameDataStore } from "@/stores/gameData.store";
import {
  scaleCharacterPositions,
  validateImageData,
} from "@/utils/gameImage.util";
import { useResizeObserver } from "./use-resizeObserver";

interface Position {
  x: number;
  y: number;
}

export interface CharacterData {
  characterName: string;
  position: Position;
  tolerance: Position;
}

/**
 * Calculates and maintains scaled character positions based on image dimensions.
 *
 * Automatically recalculates positions when the image loads or window resizes,
 * converting original coordinate ratios to pixel positions that match the
 * currently displayed image size.
 *
 * @returns Object containing scaled character positions and image ref to attach
 *
 * @example
 * ```tsx
 * const { characterPositions, imageRef } = useCharacterPositions();
 *
 * <img ref={imageRef} src={gameSrc} />
 * {characterPositions.map(char => (
 *   <Marker position={char.position} tolerance={char.tolerance} />
 * ))}
 * ```
 */
export const useCharacterPositions = () => {
  const [characterPositions, setCharacterPositions] = useState<CharacterData[]>(
    []
  );
  const imageRef = useRef<HTMLImageElement>(null);
  const { selectedImageData } = useGameDataStore();

  // Recalculate whenever image size changes
  const updatePositions = () => {
    const img = imageRef.current;
    if (!img || !selectedImageData) return;

    const { width, height } = img.getBoundingClientRect();
    if (!width || !height) return;
    if (!validateImageData(selectedImageData)) return;

    try {
      const scaled = scaleCharacterPositions(selectedImageData, width, height);
      setCharacterPositions(scaled);
    } catch (error) {
      console.error("Error calculating positions:", error);
      toast.error("Calculation Error", {
        description: "Unable to calculate character positions. Please refresh.",
        duration: 5000,
      });
    }
  };

  // Calculate on image load
  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    if (img.complete) {
      updatePositions();
    }

    img.addEventListener("load", updatePositions);
    return () => img.removeEventListener("load", updatePositions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImageData]);

  // Recalculate on window resize (debounced via ResizeObserver)
  useResizeObserver(imageRef, updatePositions);

  return { characterPositions, imageRef };
};

export default useCharacterPositions;
