import CreditsModal from "./CreditsModal";
import HowToPlayModal from "./HowToPlayModal";
import { Button } from "./ui/button";
import { RotateCcw, HelpCircle, Users } from "lucide-react";
import { useState } from "react";

interface FooterProps {
  resetGame: () => void;
}
const Footer = ({ resetGame }: FooterProps) => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center space-x-8 space-y-4 md:space-y-0">
            <Button
              onClick={resetGame}
              variant={"ghost"}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Restart Game</span>
            </Button>

            <Button
              onClick={() => setShowHowToPlay(true)}
              variant={"ghost"}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <HelpCircle className="w-5 h-5" />
              <span>How to Play</span>
            </Button>

            <Button
              onClick={() => setShowCredits(true)}
              variant={"ghost"}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Users className="w-5 h-5" />
              <span>Credits</span>
            </Button>
          </div>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              {`© ${currentYear} Where's Waldo Game. Built with ❤️ for puzzle lovers
              everywhere.`}
            </p>
          </div>
        </div>
      </footer>

      <HowToPlayModal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />

      <CreditsModal
        isOpen={showCredits}
        onClose={() => setShowCredits(false)}
      />
    </>
  );
};

export default Footer;
