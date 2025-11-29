import express, { RequestHandler } from "express";
import attachLogContext from "../middleware/logContext.middleware";
import { getLeaderboardForImage } from "../controllers/leaderboard.controller";

const router = express.Router();

router.use(attachLogContext("LeaderboardRoute"));

router.get("/image/:id/leaderboard", getLeaderboardForImage as RequestHandler);

export default router;
