import { useGameStatusStore } from "@/stores/gameStatus.store";
import { useGameUIStore } from "@/stores/gameUI.store";
import { useGameMetricsStore } from "@/stores/gameMetrics.store";
import { useGameProgressStore } from "@/stores/gameProgress.store";

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
    const { closeDropdown } = useGameUIStore.getState();

    if (isRunning()) {
      setStatus("PAUSED");
      closeDropdown();
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
   * Ends the current game session.
   *
   * Sets the game status to ENDED. This is typically called automatically
   * when all characters are found or time expires.
   *
   * @example
   * ```typescript
   * if (allCharactersFound) {
   *   GameActions.endGame();
   * }
   * ```
   */
  endGame: () => {
    const { setStatus } = useGameStatusStore.getState();
    setStatus("ENDED");
  },

  /**
   * Resets all game state to initial values.
   *
   * Clears game status, UI state, metrics, and character progress.
   * Use this to prepare for a new game or when quitting.
   *
   * @remarks
   * This coordinates resets across four stores:
   * - Game status → IDLE
   * - UI → Clear dropdowns and modals
   * - Metrics → Reset timer and scores
   * - Progress → Clear found characters
   *
   * @example
   * ```tsx
   * <Button onClick={GameActions.resetGame}>Play Again</Button>
   * ```
   */
  resetGame: () => {
    const { setStatus } = useGameStatusStore.getState();
    const { reset: resetUI } = useGameUIStore.getState();
    const { reset: resetMetrics } = useGameMetricsStore.getState();
    const { resetGame: resetProgress } = useGameProgressStore.getState();

    setStatus("IDLE");
    resetUI();
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
    const { openDropdownAt } = useGameUIStore.getState();

    if (isRunning()) {
      openDropdownAt(x, y);
    }
  },

  /**
   * Closes the character selection target box/dropdown.
   *
   * Clears both the dropdown visibility and the stored box position.
   * Safe to call even if no dropdown is currently open.
   *
   * @example
   * ```tsx
   * <TargetBox onClose={GameActions.closeTargetBox} />
   * ```
   */
  closeTargetBox: () => {
    const { closeDropdown } = useGameUIStore.getState();
    closeDropdown();
  },
};
