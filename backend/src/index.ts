import express from "express";
import router from "./routes/index.route.js";
import cors from "cors";
import { corsOptions } from "./core/config/cors.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
