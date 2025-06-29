import express, { RequestHandler } from "express";
import { addCharacterLocation } from "../controllers/characterLocation.controller.js";

const router = express.Router();

router.post(
  "/image/:id/character-location",
  addCharacterLocation as RequestHandler
);

export default router;
