import express, { RequestHandler } from "express";
import {
  addNewImage,
  getAllImages,
  getImage,
} from "../controllers/image.controller.js";

const router = express.Router();

router.post("/image", addNewImage as RequestHandler);
router.get("/images", getAllImages as RequestHandler);
router.get("/image/:id", getImage as RequestHandler);

export default router;
