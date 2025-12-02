import express, { RequestHandler } from "express";
import {
  addNewImage,
  getAllImages,
  getImage,
} from "../controllers/image.controller.js";
import attachLogContext from "../middleware/logContext.middleware.js";

const router = express.Router();

router.use(attachLogContext("ImageRoute"));

router.post("/image", addNewImage as RequestHandler);
router.get("/images", getAllImages as RequestHandler);
router.get("/image/:id", getImage as RequestHandler);

export default router;
