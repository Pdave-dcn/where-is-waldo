import { Button } from "./ui/button";
import { RotateCcw, HelpCircle, Users } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center space-x-8 space-y-4 md:space-y-0">
          <Button variant={"ghost"} className="flex items-center space-x-2">
            <RotateCcw className="w-5 h-5" />
            <span>Restart Game</span>
          </Button>

          <Button variant={"ghost"} className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5" />
            <span>How to Play</span>
          </Button>

          <Button variant={"ghost"} className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Credits</span>
          </Button>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            © 2025 Where's Waldo Game. Built with ❤️ for puzzle lovers
            everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
