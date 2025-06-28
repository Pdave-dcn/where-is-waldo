import express from "express";
import router from "./routes/routerIndex.route.js";
import cors from "cors";
import { corsOptions } from "./config/cors.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use("/", router);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
