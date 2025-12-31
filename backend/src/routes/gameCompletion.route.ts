import express, { RequestHandler } from "express";
import { createNewGameCompletion } from "../controllers/gameCompletion.controller.js";
import attachLogContext from "../middleware/logContext.middleware.js";
import { leaderboardSubmitLimiter } from "../middleware/coreRateLimits.middleware.js";

const router = express.Router();

router.use(attachLogContext("GameCompletionRoute"));

router.post(
  "/image/:id/game-completion",
  leaderboardSubmitLimiter,
  createNewGameCompletion as RequestHandler
);

export default router;
