import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Timer from "@/components/Timer";
import GameImage from "@/components/GameImage/GameImage";
import ImageSelector from "@/components/ImageSelector/ImageSelector";
import PauseOverlay from "@/components/PauseOverlay";
import WinnerForm from "@/components/WinnerFormModal/WinnerForm";
import { StartGameCard } from "@/components/StartGameCard";
import { GameInstructionsModal } from "@/components/GameInstructionsModal/GameInstructionsModal";
import { useGameOrchestrator } from "@/hooks/use-gameOrchestrator";
import { useGameStatusStore } from "@/stores/gameStatus.store";
import { useGameUIStore } from "@/stores/gameUI.store";
import { useGameDataStore } from "@/stores/gameData.store";
import { GameActions } from "@/services/gameActions.service";

const Index = () => {
  const { isGameComplete, handleStartGame, handleQuitGame, handleResetGame } =
    useGameOrchestrator();

  const { isActive, isEnded, isPaused } = useGameStatusStore();
  const { showInfoModal } = useGameUIStore();
  const { selectedImageId } = useGameDataStore();

  if (!selectedImageId && !isActive()) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <ImageSelector />
        </main>
        <Footer resetGame={handleResetGame} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 bg-accent">
      <Header />
      <main className="flex flex-col items-center gap-8 px-5">
        <Timer />

        <div className="flex flex-col justify-center items-center w-full mx-auto">
          {isActive() || isEnded() ? (
            <GameImage />
          ) : (
            <StartGameCard onStartGame={handleStartGame} />
          )}
        </div>
      </main>
      <Footer resetGame={handleResetGame} />

      {showInfoModal && <GameInstructionsModal />}

      {isPaused() && (
        <PauseOverlay
          onRestart={GameActions.restartGame}
          onResume={GameActions.togglePause}
          onQuit={handleQuitGame}
        />
      )}

      {isGameComplete && <WinnerForm />}
    </div>
  );
};

export default Index;
