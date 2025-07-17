import { useGameData } from "@/hooks/use-GameData";
import { Loader } from "./ui/loader";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { motion } from "motion/react";

// Helper function to generate a Cloudinary thumbnail URL
const getThumbnailUrl = (
  originalUrl: string,
  width: number,
  height: number = 0
): string => {
  if (!originalUrl || !originalUrl.includes("cloudinary.com")) {
    return originalUrl;
  }

  // Split the URL to insert transformations
  // Example: https://res.cloudinary.com/<cloud_name>/image/upload/v12345/public_id.jpg
  // We want to insert 'w_X,h_Y,c_fill,q_auto,f_auto' after '/upload/'
  const parts = originalUrl.split("/upload/");
  if (parts.length !== 2) {
    return originalUrl;
  }

  // Using c_fill for maintaining consistent dimensions in a grid
  // Using q_auto and f_auto for optimal performance and file size
  const transformation = `w_${width}${
    height > 0 ? `,h_${height}` : ""
  },c_fill,q_auto,f_auto`;

  return `${parts[0]}/upload/${transformation}/${parts[1]}`;
};

const ImageSelector = () => {
  const { allAvailableImages, selectImage, allImagesError, allImagesLoading } =
    useGameData();

  if (allImagesLoading) {
    return (
      <div className="flex items-center justify-center bg-accent py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-5xl">
            <CardContent className="p-8 flex items-center justify-center">
              <div className="text-center flex flex-col items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Loader />
                </motion.div>
                <motion.p
                  className="mt-4 text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Loading game...
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (allImagesError) {
    return (
      <div className="flex items-center justify-center bg-accent py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-5xl">
            <CardContent className="p-8 text-center">
              <motion.h2
                className="text-2xl font-bold text-destructive mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                Failed to load images
              </motion.h2>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Unable to load the game.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  variant={"outline"}
                  className="px-4 py-2 rounded mt-3"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (!allAvailableImages) {
    return (
      <div className="flex items-center justify-center bg-accent py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-5xl">
            <CardContent className="p-8 text-center">
              <motion.h2
                className="text-2xl font-bold text-muted-foreground"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                No Game Data
              </motion.h2>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                No game data available.
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const thumbnailWidth = 400;
  const thumbnailHeight = 250;

  return (
    <motion.div
      className="min-h-screen bg-accent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="text-center mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose Your Challenge
          </motion.h2>
          <motion.p
            className="text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Select an image to start your Waldo hunting adventure!
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {allAvailableImages.map((option, index) => (
            <motion.div
              key={option.id}
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
                onClick={() => selectImage(option.id)}
              >
                <CardContent className="aspect-video relative overflow-hidden">
                  <motion.img
                    src={getThumbnailUrl(
                      option.imageUrl,
                      thumbnailWidth,
                      thumbnailHeight
                    )}
                    alt={option.name}
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
                    {option.name}
                  </motion.h3>
                  <motion.p
                    className="text-muted-foreground text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    {option.description}
                  </motion.p>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ImageSelector;
