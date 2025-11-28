import { getGameImages, getImageById } from "@/api/image.api";
import { useQuery } from "@tanstack/react-query";

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

export { useImagesQuery, useSingleImageQuery };
