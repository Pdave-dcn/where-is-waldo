import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import handleError from "../core/error/index.js";

export const errorMiddleware: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  handleError(err, req, res);
};
