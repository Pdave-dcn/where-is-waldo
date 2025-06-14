import { Clock, RotateCcw, HelpCircle, Users } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";

const App = () => {
  return (
    <div className="flex flex-col gap-8 bg-accent">
      <header className="bg-primary flex flex-col justify-center items-center py-8 text-primary-foreground">
        <div className=" flex flex-col justify-center items-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-2">
            WHERE'S WALDO?
          </h1>
          <p className="sm:text-lg">The ultimate search and find challenge!</p>
        </div>
      </header>
      <main className="flex flex-col items-center gap-8 px-5">
        <Card className="w-[10rem] flex items-center">
          <CardContent>
            <div className="flex gap-4 items-center">
              <Clock size={20} />
              <span className="text-2xl font-bold">0:00</span>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-center items-center w-full max-w-6xl mx-auto">
          <CardContent className="text-center py-10">
            <div className="mb-5">
              <h1 className="text-xl sm:text-3xl font-medium mb-2">
                Ready to Find Waldo?
              </h1>
              <p className="text-muted-foreground">
                Click on Waldo when you spot him in the crowd!
              </p>
            </div>
            <Button className="self-center">Start game</Button>
          </CardContent>
        </Card>
      </main>
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
    </div>
  );
};

export default App;
