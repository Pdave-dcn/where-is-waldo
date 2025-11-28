import { Prisma } from "@prisma/client";
import { Response } from "express";
import DatabaseErrorHandler from "./handlers/database.handler";
import { ZodError } from "zod";
import ValidationErrorHandler from "./handlers/validation.handler";

const handleError = (error: unknown, res: Response) => {
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
