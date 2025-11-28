import { motion } from "motion/react";
import { useImagesQuery, usePrefetchImage } from "@/queries/image.query";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { EmptyState } from "./EmptyState";
import { ImageSelectorHeader } from "./ImageSelectorHeader";
import { ImageCard } from "./ImageCard";
import { useGameDataStore } from "@/stores/gameData.store";
import preloadImageBinary from "@/utils/preloadImageBinary";

const ImageSelector = () => {
  const { data: images, isLoading, error } = useImagesQuery();
  const { selectImage } = useGameDataStore();
  const { prefetchImage } = usePrefetchImage();

  const handleImageSelect = async (imageId: string) => {
    selectImage(imageId);

    const data = await prefetchImage(imageId);

    // Preload the image binary for faster display later
    if (data?.url) {
      preloadImageBinary(data.url);
    }
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!images || images.length === 0) return <EmptyState />;

  return (
    <motion.div
      className="min-h-screen bg-accent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-8">
        <ImageSelectorHeader />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {images.map((image, index) => (
            <ImageCard
              key={image.id}
              image={image}
              index={index}
              onSelect={handleImageSelect}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ImageSelector;
