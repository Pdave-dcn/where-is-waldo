import express, { Request, Response } from "express";

const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from API");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
