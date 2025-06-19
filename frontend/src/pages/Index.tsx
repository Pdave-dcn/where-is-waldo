import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRef, useState } from "react";
import Timer from "@/components/Timer";
import GameImage from "@/components/GameImage";

interface TimerRef {
  reset: () => void;
}

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [boxPosition, setBoxPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const timerRef = useRef<TimerRef>(null);

  const resetGame = () => {
    setGameStarted(false);
    timerRef.current?.reset();
    setBoxPosition(null);
    setShowDropdown(false);
  };

  const handleImageClick = (x: number, y: number) => {
    if (!gameStarted) return;

    setBoxPosition({ x, y });
    setShowDropdown(true);
  };

  const handleTargetBoxClose = () => {
    setBoxPosition(null);
    setShowDropdown(false);
  };

  return (
    <div className="flex flex-col gap-8 bg-accent">
      <Header />
      <main className="flex flex-col items-center gap-8 px-5">
        <Timer gameStarted={gameStarted} ref={timerRef} />

        <div className="flex flex-col justify-center items-center w-full mx-auto">
          {gameStarted ? (
            <GameImage
              onImageClick={handleImageClick}
              gameStarted={gameStarted}
              boxPosition={boxPosition}
              onBoxClose={handleTargetBoxClose}
              showDropdown={showDropdown}
            />
          ) : (
            <Card className="w-full max-w-5xl">
              <CardContent className="text-center py-10">
                <div className="mb-5">
                  <h1 className="text-xl sm:text-3xl font-medium mb-2">
                    Ready to Find Waldo?
                  </h1>
                  <p className="text-muted-foreground">
                    Click on Waldo when you spot him in the crowd!
                  </p>
                </div>
                <Button
                  onClick={() => setGameStarted(true)}
                  className="self-center"
                >
                  Start game
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer resetGame={resetGame} />
    </div>
  );
};

export default Index;
