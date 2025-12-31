import express, { RequestHandler } from "express";
import {
  addNewImage,
  getAllImages,
  getImage,
} from "../controllers/image.controller.js";
import attachLogContext from "../middleware/logContext.middleware.js";
import {
  generalApiLimiter,
  imageSelectionLimiter,
  imageUploadLimiter,
} from "../middleware/coreRateLimits.middleware.js";

const router = express.Router();

router.use(attachLogContext("ImageRoute"));
router.use(generalApiLimiter);

router.post("/image", imageUploadLimiter, addNewImage as RequestHandler);

router.use(imageSelectionLimiter);

router.get("/images", getAllImages as RequestHandler);
router.get("/image/:id", getImage as RequestHandler);

export default router;
