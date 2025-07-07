import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRef, useState } from "react";
import Timer from "@/components/Timer";
import GameImage from "@/components/GameImage";
import { useGameData } from "@/hooks/use-GameData";
import ImageSelector from "@/components/ImageSelector";

interface TimerRef {
  reset: () => void;
  stop: () => number;
}

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [boxPosition, setBoxPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const timerRef = useRef<TimerRef>(null);
  const [isWaldoFound, setIsWaldoFound] = useState(false);
  const [isOdlawFound, setIsOdlawFound] = useState(false);

  const { allImagesError, selectedImageError, selectedImageId } = useGameData();

  const startGame = () => {
    if (allImagesError || selectedImageError) {
      setGameStarted(false);
      setGameEnded(false);
      return;
    }
    setGameStarted(true);
    setGameEnded(false);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    timerRef.current?.reset();
    setBoxPosition(null);
    setShowDropdown(false);
    setIsWaldoFound(false);
    setIsOdlawFound(false);
  };

  const handleImageClick = (x: number, y: number) => {
    if (!gameStarted || gameEnded) return;

    setBoxPosition({ x, y });
    setShowDropdown(true);
  };

  const handleTargetBoxClose = () => {
    setBoxPosition(null);
    setShowDropdown(false);
  };

  if (!selectedImageId) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <ImageSelector />
        </main>
        <Footer resetGame={resetGame} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 bg-accent">
      <Header />
      <main className="flex flex-col items-center gap-8 px-5">
        <Timer isRunning={gameStarted && !gameEnded} ref={timerRef} />

        <div className="flex flex-col justify-center items-center w-full mx-auto">
          {gameStarted ? (
            <GameImage
              onImageClick={handleImageClick}
              gameStarted={gameStarted}
              boxPosition={boxPosition}
              onBoxClose={handleTargetBoxClose}
              showDropdown={showDropdown}
              timerRef={timerRef}
              isWaldoFound={isWaldoFound}
              isOdlawFound={isOdlawFound}
              setIsWaldoFound={setIsWaldoFound}
              setIsOdlawFound={setIsOdlawFound}
              setGameEnded={setGameEnded}
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
                <Button onClick={() => startGame()} className="self-center">
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
