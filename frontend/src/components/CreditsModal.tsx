import { X } from "lucide-react";
import { Button } from "./ui/button";

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreditsModal = ({ isOpen, onClose }: CreditsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] p-4 animate-fade-in">
      <div className="bg-background rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Credits</h2>
            <Button
              variant={"ghost"}
              onClick={onClose}
              className="p-1 rounded-full cursor-pointer"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">🎨 Original Creation</h3>
              <p>
                Where's Waldo? was created by Martin Handford and first
                published in 1987.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">🖼️ Image</h3>
              <p>Crowd scene image provided by WallpaperAccess website.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">⚡ Technology</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Built with React & TypeScript</li>
                <li>Styled with Tailwind CSS</li>
                <li>Icons by Lucide React</li>
                <li>Powered by Vite</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">💝 Special Thanks</h3>
              <p>
                To all the puzzle enthusiasts and Waldo fans who keep the search
                alive!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditsModal;
