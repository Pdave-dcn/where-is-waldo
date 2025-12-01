import { useGameStatusStore } from "@/stores/gameStatus.store";
import { useGameUIStore } from "@/stores/gameUI.store";
import { useGameMetricsStore } from "@/stores/gameMetrics.store";
import { useGameProgressStore } from "@/stores/gameProgress.store";
import { useGameDataStore } from "@/stores/gameData.store";
import { useTimerStore } from "@/stores/gameTimer.store";

/**
 * Game action service that coordinates business logic across multiple stores.
 *
 * This service layer encapsulates all game state transitions and cross-store
 * operations, providing a clean API for game control. Unlike React hooks,
 * these actions can be called from anywhere in the application.
 *
 * @remarks
 * - All methods are pure functions with no side effects beyond store updates
 * - Safe to call from event handlers, timers, or other non-React contexts
 * - Coordinates multiple stores to maintain consistency
 * - Implements business rules (e.g., can only pause when running)
 *
 * @example
 * ```tsx
 * // In a React component
 * <Button onClick={GameActions.startGame}>Start Game</Button>
 * <Button onClick={GameActions.togglePause}>Pause/Resume</Button>
 *
 * // In an event handler
 * function handleImageClick(e: MouseEvent) {
 *   GameActions.handleImageClick(e.clientX, e.clientY);
 * }
 *
 * // From a service or utility
 * if (timeExpired) {
 *   GameActions.endGame();
 * }
 * ```
 */
export const GameActions = {
  /**
   * Starts a new game session.
   *
   * Sets the game status to RUNNING and records the start time for tracking.
   *
   * @example
   * ```tsx
   * <Button onClick={GameActions.startGame}>Start</Button>
   * ```
   */
  startGame: () => {
    const { setStatus } = useGameStatusStore.getState();
    const { setStartTime } = useGameMetricsStore.getState();

    setStatus("RUNNING");
    useTimerStore.getState().start();
    setStartTime(Date.now());
  },

  /**
   * Pauses the current game if it's running.
   *
   * Closes any open UI elements (dropdown/target box) when pausing.
   * No-op if the game is not currently running.
   *
   * @example
   * ```tsx
   * <Button onClick={GameActions.pauseGame}>Pause</Button>
   * ```
   */
  pauseGame: () => {
    const { isRunning, setStatus } = useGameStatusStore.getState();
    const { setBoxPosition } = useGameUIStore.getState();

    if (isRunning()) {
      setStatus("PAUSED");
      useTimerStore.getState().pause();
      setBoxPosition(null);
    }
  },

  /**
   * Resumes a paused game.
   *
   * Returns the game to RUNNING state.
   * No-op if the game is not currently paused.
   *
   * @example
   * ```tsx
   * <Button onClick={GameActions.resumeGame}>Resume</Button>
   * ```
   */
  resumeGame: () => {
    const { isPaused, setStatus } = useGameStatusStore.getState();

    if (isPaused()) {
      setStatus("RUNNING");
      useTimerStore.getState().resume();
    }
  },

  /**
   * Toggles between paused and running states.
   *
   * Convenience method that calls `pauseGame()` if running or `resumeGame()` if paused.
   * No-op if the game is in IDLE or ENDED state.
   *
   * @example
   * ```tsx
   * <Button onClick={GameActions.togglePause}>
   *   {isPaused ? 'Resume' : 'Pause'}
   * </Button>
   * ```
   */
  togglePause: () => {
    const { isRunning, isPaused } = useGameStatusStore.getState();

    if (isRunning()) {
      GameActions.pauseGame();
    } else if (isPaused()) {
      GameActions.resumeGame();
    }
  },

  /**
   * Finalizes the current game session.
   *
   * Stops the global timer, records the final time in the metrics store,
   * and transitions the game state to `ENDED`. This action acts as the
   * authoritative ending point for any game session.
   *
   * Typically invoked automatically when all characters have been found,
   * but can also be called directly from UI controls or game flow logic.
   *
   * @remarks
   * - Captures and stores the player's total time (`secondsTaken`)
   * - Stops and cleans up the global timer interval
   * - Sets the game status to `ENDED`
   * - Does **not** reset any data — use `resetGame()` for a full reset
   *
   * @example
   * ```ts
   * if (allCharactersFound) {
   *   GameActions.endGame();
   * }
   * ```
   */
  endGame: () => {
    const time = useTimerStore.getState().stop();
    useGameMetricsStore.getState().setSecondsTaken(time);
    const { setStatus } = useGameStatusStore.getState();
    setStatus("ENDED");
  },

  /**
   * Resets all game state to initial values.
   *
   * Clears game status, UI state, metrics, and character progress.
   * Also resets the timer if available.
   * Use this to prepare for a new game or when quitting.
   *
   * @remarks
   * This coordinates resets across four stores:
   * - Game status → IDLE
   * - UI → Clear dropdowns and modals
   * - Metrics → Reset timer and scores
   * - Progress → Clear found characters
   * - Timer → Reset to 0
   *
   * @example
   * ```tsx
   * <Button onClick={GameActions.resetGame}>Play Again</Button>
   * ```
   */
  resetGame: () => {
    const { reset: resetGameData } = useGameDataStore.getState();
    const { setStatus } = useGameStatusStore.getState();
    const { reset: resetUI } = useGameUIStore.getState();
    const { reset: resetMetrics } = useGameMetricsStore.getState();
    const { resetGame: resetProgress } = useGameProgressStore.getState();

    resetGameData();
    useTimerStore.getState().reset();
    setStatus("IDLE");
    resetUI();
    resetMetrics();
    resetProgress();
  },

  /**
   * Restarts the current game without changing the selected image.
   *
   * Resets metrics, progress, and timer while keeping the same image data.
   * Sets game status back to IDLE so the player can start fresh.
   *
   * @example
   * ```tsx
   * <Button onClick={GameActions.restartGame}>Restart</Button>
   * ```
   */
  restartGame: () => {
    const { setStatus } = useGameStatusStore.getState();
    const { reset: resetMetrics } = useGameMetricsStore.getState();
    const { resetGame: resetProgress } = useGameProgressStore.getState();

    useTimerStore.getState().reset();
    setStatus("IDLE");
    resetMetrics();
    resetProgress();
  },

  /**
   * Handles a click on the game image.
   *
   * Opens the character selection dropdown at the clicked coordinates
   * if the game is currently running. Ignores clicks when paused or not started.
   *
   * @param x - The x-coordinate of the click (in pixels)
   * @param y - The y-coordinate of the click (in pixels)
   *
   * @example
   * ```tsx
   * <img
   *   onClick={(e) => GameActions.handleImageClick(e.clientX, e.clientY)}
   *   src={gameImage}
   * />
   * ```
   */
  handleImageClick: (x: number, y: number) => {
    const { isRunning } = useGameStatusStore.getState();
    const { setBoxPosition } = useGameUIStore.getState();

    if (isRunning()) {
      setBoxPosition({ x, y });
    }
  },

  /**
   * Closes the character selection target box.
   *
   * Clears both the character list visibility and the stored box position.
   * Safe to call even if no dropdown is currently open.
   *
   * @example
   * ```tsx
   * <TargetBox onClose={GameActions.closeTargetBox} />
   * ```
   */
  closeTargetBox: () => {
    const { setBoxPosition } = useGameUIStore.getState();
    setBoxPosition(null);
  },
};
