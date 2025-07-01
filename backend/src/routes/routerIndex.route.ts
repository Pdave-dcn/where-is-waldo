import express from "express";
import imageRoutes from "./image.route.js";
import characterLocationRoutes from "./characterLocation.route.js";
import gameCompletionRoutes from "./gameCompletion.route.js";
import prisma from "../config/db.js";

const router = express.Router();

router.get("/health", (_req, res) => {
  res.status(200).json({ status: "UP", message: "Server is healthy" });
});

router.get("/status", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: "UP",
      server: "running",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Detailed health check failed:", error);
    res.status(500).json({
      status: "DOWN",
      server: "running (but unhealthy)",
      database: "disconnected",
      error: "Failed to connect to database",
      timestamp: new Date().toISOString(),
    });
  }
});

router.use("/api", imageRoutes);
router.use("/api", characterLocationRoutes);
router.use("/api", gameCompletionRoutes);

export default router;
