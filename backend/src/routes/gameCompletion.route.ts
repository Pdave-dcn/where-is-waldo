import express, { RequestHandler } from "express";
import {
  createNewGameCompletion,
  getLeaderboardForImage,
} from "../controllers/gameCompletion.controller.js";
import attachLogContext from "../middleware/logContext.middleware.js";

const router = express.Router();

router.use(attachLogContext("GameCompletionRoute"));

router.post(
  "/image/:id/game-completion",
  createNewGameCompletion as RequestHandler
);

router.get(
  "/image/:id/game-completion",
  getLeaderboardForImage as RequestHandler
);

export default router;
