import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import DatabaseErrorHandler from "./handlers/database.handler.js";
import { ZodError } from "zod";
import ValidationErrorHandler from "./handlers/validation.handler.js";
import { logger } from "../config/logger.js";

const handleError = (error: unknown, res: Response) => {
  const req = res.req as
    | (Request & { logContext?: Record<string, unknown> })
    | undefined;
  const contextLogger = logger.child(req?.logContext ?? {});

  const errorType =
    error instanceof Error ? error.constructor.name : typeof error;
  const errorMessage =
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Error
      ? error.message
      : String(error);

  contextLogger.error(
    {
      errorType,
      errorDescription: errorMessage,
      stack:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.stack
            : undefined
          : undefined,
    },
    `Request failed with error (${errorType})`
  );

  let errorResponse;

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error("Prisma Known Request Error:", error);
    errorResponse = DatabaseErrorHandler.handlePrismaKnownError(error);
  } else if (error instanceof ZodError) {
    console.error("Validation Error:", error);
    errorResponse = ValidationErrorHandler.handleValidationError(error);
  } else {
    console.error("Unhandled error:", error);
    errorResponse = {
      status: 500,
      response: {
        message: "Internal server error",
      },
    };
  }

  return res.status(errorResponse.status).json(errorResponse.response);
};

export default handleError;
