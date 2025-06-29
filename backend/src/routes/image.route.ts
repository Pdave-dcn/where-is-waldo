import express, { RequestHandler } from "express";
import { addNewImage, getImage } from "../controllers/image.controller.js";

const router = express.Router();

router.post("/image", addNewImage as RequestHandler);

router.get("/image/:id", getImage as RequestHandler);

export default router;
