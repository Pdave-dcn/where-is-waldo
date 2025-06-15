import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRef, useState } from "react";
import Timer from "@/components/Timer";

interface TimerRef {
  reset: () => void;
}

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const timerRef = useRef<TimerRef>(null);

  const resetGame = () => {
    setGameStarted(false);
    timerRef.current?.reset();
  };

  return (
    <div className="flex flex-col gap-8 bg-accent">
      <Header />
      <main className="flex flex-col items-center gap-8 px-5">
        <Timer gameStarted={gameStarted} ref={timerRef} />

        <Card className="flex flex-col justify-center items-center w-full max-w-5xl mx-auto">
          {gameStarted ? (
            <CardContent>
              <img src="img-1.jpg" alt="Mock image" />
            </CardContent>
          ) : (
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
          )}
        </Card>
      </main>
      <Footer resetGame={resetGame} />
    </div>
  );
};

export default Index;
