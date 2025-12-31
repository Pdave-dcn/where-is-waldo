import express, { RequestHandler } from "express";
import attachLogContext from "../middleware/logContext.middleware.js";
import { getLeaderboardForImage } from "../controllers/leaderboard.controller.js";
import {
  generalApiLimiter,
  leaderboardViewLimiter,
} from "../middleware/coreRateLimits.middleware.js";

const router = express.Router();

router.use(attachLogContext("LeaderboardRoute"));
router.use(generalApiLimiter);
router.use(leaderboardViewLimiter);

router.get("/image/:id/leaderboard", getLeaderboardForImage as RequestHandler);

export default router;
