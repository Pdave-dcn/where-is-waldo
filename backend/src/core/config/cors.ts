import dotenv from "dotenv";
dotenv.config();
import { CorsOptions } from "cors";

const allowedOrigin = process.env.ALLOWED_ORIGIN;

export const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigin?.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
