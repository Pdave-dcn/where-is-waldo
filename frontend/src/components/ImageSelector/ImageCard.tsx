import { motion } from "motion/react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { getThumbnailUrl } from "@/utils/imageSelectorUtils";
import type { GameImage } from "@/zodSchemas/image.zod";

interface ImageCardProps {
  image: GameImage;
  index: number;
  onSelect: (id: string) => void;
}

const THUMBNAIL_WIDTH = 400;
const THUMBNAIL_HEIGHT = 250;

export const ImageCard = ({ image, index, onSelect }: ImageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 },
      }}
    >
      <Card
        className="relative rounded-lg shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
        onClick={() => onSelect(image.id)}
      >
        <CardContent className="aspect-video relative overflow-hidden">
          <motion.img
            src={getThumbnailUrl(
              image.imageUrl,
              THUMBNAIL_WIDTH,
              THUMBNAIL_HEIGHT
            )}
            alt={image.name}
            className="w-full h-full object-cover"
            loading="lazy"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          />
          <motion.div
            className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
        </CardContent>
        <CardFooter className="p-4 flex flex-col items-start">
          <motion.h3
            className="font-bold text-lg mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            {image.name}
          </motion.h3>
          <motion.p
            className="text-muted-foreground text-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            {image.description}
          </motion.p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
