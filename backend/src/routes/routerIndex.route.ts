import express from "express";
import imageRoutes from "./image.route.js";
import characterLocationRoutes from "./characterLocation.route.js";
import gameCompletionRoutes from "./gameCompletion.route.js";

const router = express.Router();

router.use("/api", imageRoutes);
router.use("/api", characterLocationRoutes);
router.use("/api", gameCompletionRoutes);

export default router;
