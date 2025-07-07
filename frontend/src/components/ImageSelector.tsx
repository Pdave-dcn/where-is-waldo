import { useGameData } from "@/hooks/use-GameData";
import { Loader } from "./ui/loader";
import { Button } from "./ui/button";

const ImageSelector = () => {
  const {
    allAvailableImages,
    selectImage,
    selectedImageId,
    allImagesError,
    allImagesLoading,
  } = useGameData();

  if (allImagesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader />
      </div>
    );
  }

  if (allImagesError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Failed to load images</h2>
          <p className="mb-4 text-red-600">{allImagesError.message}</p>
          <Button
            className="px-4 py-2 bg-accent rounded hover:bg-accent-dark transition"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!allAvailableImages) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">Choose Your Challenge</h2>
          <p className="text-lg">
            Select an image to start your Waldo hunting adventure!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          {allAvailableImages.map((option) => (
            <div
              key={option.id}
              className={`relative rounded-lg shadow-lg border-4 transition-all duration-200 cursor-pointer transform hover:scale-105 ${
                selectedImageId === option.id
                  ? "border ring-4"
                  : "border hover:border"
              }`}
              onClick={() => selectImage(option.id)}
            >
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={option.imageUrl}
                  alt={option.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{option.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSelector;
