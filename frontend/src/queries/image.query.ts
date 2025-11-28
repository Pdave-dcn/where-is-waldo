import { getGameImages, getImageById } from "@/api/image.api";
import type { ImageData } from "@/zodSchemas/image.zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useImagesQuery = () => {
  return useQuery({
    queryKey: ["image", "all"],
    queryFn: getGameImages,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};

const useSingleImageQuery = (imageId: string) => {
  return useQuery({
    queryKey: ["image", imageId],
    queryFn: () => getImageById(imageId),
    staleTime: 24 * 60 * 60 * 1000,
  });
};

const usePrefetchImage = () => {
  const queryClient = useQueryClient();

  const prefetchImage = async (imageId: string): Promise<ImageData> => {
    return await queryClient.fetchQuery({
      queryKey: ["image", imageId],
      queryFn: () => getImageById(imageId),
      staleTime: 24 * 60 * 60 * 1000,
    });
  };

  return { prefetchImage };
};

export { useImagesQuery, useSingleImageQuery, usePrefetchImage };
