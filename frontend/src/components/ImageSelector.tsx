import { useState } from "react";
import { Play } from "lucide-react";

interface ImageOption {
  id: string;
  name: string;
  url: string;
}

const imageOptions: ImageOption[] = [
  {
    id: "crowd-1",
    url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1600&h=1200&fit=crop",
    name: "Tech Conference",
  },
  {
    id: "crowd-2",
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&h=1200&fit=crop",
    name: "Workspace Chaos",
  },
  {
    id: "crowd-3",
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&h=1200&fit=crop",
    name: "Office Scene",
  },
  {
    id: "crowd-4",
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1600&h=1200&fit=crop",
    name: "Study Session",
  },
  {
    id: "crowd-5",
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=1200&fit=crop",
    name: "Coding Café",
  },
];

const ImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

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
          {imageOptions.map((option) => (
            <div
              key={option.id}
              className={`relative rounded-lg shadow-lg border-4 transition-all duration-200 cursor-pointer transform hover:scale-105 ${
                selectedImage === option.url
                  ? "border ring-4"
                  : "border hover:border"
              }`}
              onClick={() => handleImageClick(option.url)}
            >
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={option.url}
                  alt={option.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{option.name}</h3>
              </div>
              {selectedImage === option.url && (
                <div className="absolute top-2 right-2 bg-background rounded-full p-2">
                  <Play className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSelector;
