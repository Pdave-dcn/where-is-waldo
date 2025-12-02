import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameDataStore } from "@/stores/gameData.store";
import { GameActions } from "@/services/gameActions.service";
import useGameCompletion from "@/hooks/use-GameCompletion";
import { useGameStatusStore } from "@/stores/gameStatus.store";
import { useGameUIStore } from "@/stores/gameUI.store";
import { useGameProgressStore } from "@/stores/gameProgress.store";

/**
 * Game orchestrator hook that coordinates game state, side effects, and navigation.
 *
 * This hook serves as the main integration layer between multiple game stores,
 * managing the game lifecycle and synchronizing state across different concerns.
 * Should be used at the top level of the game component (e.g., Index page).
 *
 * @remarks
 * - Shows info modal when a new image is selected
 * - Handles navigation and cleanup on game quit
 *
 * @example
 * ```tsx
 * function GamePage() {
 *   const {
 *     isGameComplete,
 *     handleStartGame,
 *     handleQuitGame,
 *     handleResetGame
 *   } = useGameOrchestrator();
 *
 *   return (
 *     <div>
 *       <Button onClick={handleStartGame}>Start</Button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @returns An object containing:
 * - `isGameComplete` - Boolean indicating if all characters have been found
 * - `handleStartGame` - Function to start a new game session
 * - `handleQuitGame` - Function to quit current game and navigate to image selection
 * - `handleResetGame` - Function to reset game state and timer
 */
export const useGameOrchestrator = () => {
  const navigate = useNavigate();

  const {
    selectImage,
    selectedImageId,
    isErrorFetchingImageData,
    totalCharacters,
    availableCharacterNames,
  } = useGameDataStore();

  const { isIdle } = useGameStatusStore();
  const { setShowInfoModal } = useGameUIStore();
  const {
    areAllCharactersFound,
    setTotalCharacters,
    setAvailableCharacterNames,
  } = useGameProgressStore();

  useGameCompletion();

  const isGameComplete = areAllCharactersFound();

  // Sync total characters and available names to store
  useEffect(() => {
    setTotalCharacters(totalCharacters);
    setAvailableCharacterNames(availableCharacterNames);
  }, [
    totalCharacters,
    availableCharacterNames,
    setTotalCharacters,
    setAvailableCharacterNames,
  ]);

  // Show modal when image selected
  useEffect(() => {
    if (selectedImageId && isIdle()) {
      setShowInfoModal(true);
    }
  }, [selectedImageId, isIdle, setShowInfoModal]);

  const handleStartGame = () => {
    if (isErrorFetchingImageData) {
      GameActions.resetGame();
      return;
    }
    GameActions.startGame();
  };

  const handleQuitGame = () => {
    selectImage(null);
    navigate("/");
    GameActions.resetGame();
  };

  const handleResetGame = () => {
    GameActions.resetGame();
  };

  return {
    isGameComplete,
    handleStartGame,
    handleQuitGame,
    handleResetGame,
  };
};
