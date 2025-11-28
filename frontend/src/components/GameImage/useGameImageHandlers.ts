import { useCallback, useState } from "react";
import { toast } from "sonner";

export const useGameImageHandlers = (
  gameStarted: boolean,
  onImageClick: (x: number, y: number) => void,
  imageRef: React.RefObject<HTMLImageElement>
) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      if (!gameStarted || !imageRef.current) return;

      const imageRect = imageRef.current.getBoundingClientRect();
      const x = event.clientX - imageRect.left;
      const y = event.clientY - imageRect.top;

      onImageClick(x, y);
    },
    [gameStarted, onImageClick, imageRef]
  );

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoaded(false);
    toast.error("Game image error", {
      description: "An unexpected error occurred while loading the image.",
    });
  }, []);

  return {
    imageLoaded,
    handleClick,
    handleImageLoad,
    handleImageError,
  };
};
