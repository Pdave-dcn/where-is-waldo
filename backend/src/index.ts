import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import { corsOptions } from "./core/config/cors.js";
import { logger } from "./core/config/logger.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { httpLogger } from "./middleware/httpLogger.middleware.js";

const PORT = process.env.PORT || 3000;

const app = express();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use(httpLogger);

app.use("/", router);

app.use(errorMiddleware);

app.listen(PORT, () => {
  logger.info(
    {
      port: PORT,
    },
    "Server is running successfully"
  );
});
