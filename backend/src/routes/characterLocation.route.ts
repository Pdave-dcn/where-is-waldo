import express, { RequestHandler } from "express";
import { addCharacterLocation } from "../controllers/characterLocation.controller.js";
import attachLogContext from "../middleware/logContext.middleware.js";

const router = express.Router();

router.use(attachLogContext("CharacterLocationRoute"));

router.post(
  "/image/:id/character-location",
  addCharacterLocation as RequestHandler
);

export default router;
