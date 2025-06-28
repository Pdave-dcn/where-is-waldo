import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api", (_req: Request, res: Response) => {
  res.send("Hello from API");
});

export default router;
