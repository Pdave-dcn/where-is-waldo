import { Prisma } from "@prisma/client";

class DatabaseErrorHandler {
  static handlePrismaKnownError(error: Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      // Unique constraint violation
      case "P2002": {
        const fields = error.meta?.target as string[];
        const fieldList = fields?.join(", ") ?? "field";
        return {
          status: 409,
          response: {
            message: `Unique constraint failed on the field(s): ${fieldList}`,
            fields,
          },
        };
      }

      // Record not found
      case "P2025": {
        return {
          status: 404,
          response: {
            message: "The requested record was not found.",
          },
        };
      }

      // Foreign key constraint failed
      case "P2003": {
        const field = error.meta?.field_name as string;
        return {
          status: 400,
          response: {
            message: `Invalid reference: ${
              field ? `field '${field}'` : "foreign key constraint failed"
            }.`,
          },
        };
      }

      // Required relation violation
      case "P2014": {
        const relation = error.meta?.relation_name as string;
        return {
          status: 400,
          response: {
            message: `Cannot modify record: required relation${
              relation ? ` '${relation}'` : ""
            } would be violated.`,
          },
        };
      }

      // Null constraint violation
      case "P2011": {
        const constraint = error.meta?.constraint as string;
        return {
          status: 400,
          response: {
            message: `Missing required field${
              constraint ? `: ${constraint}` : ""
            }.`,
          },
        };
      }

      // Missing required value
      case "P2012": {
        const path = error.meta?.path as string;
        return {
          status: 400,
          response: {
            message: `Missing required value${path ? ` at ${path}` : ""}.`,
          },
        };
      }

      // Value too long for column
      case "P2000": {
        const column = error.meta?.column_name as string;
        return {
          status: 400,
          response: {
            message: `Value too long${column ? ` for field '${column}'` : ""}.`,
          },
        };
      }

      // Invalid field value
      case "P2006": {
        const field = error.meta?.field_name as string;
        return {
          status: 400,
          response: {
            message: `Invalid value${field ? ` for field '${field}'` : ""}.`,
          },
        };
      }

      // Connection timeout
      case "P2024": {
        return {
          status: 503,
          response: {
            message: "Database connection timeout. Please try again later.",
          },
        };
      }

      // Transaction failed (deadlock/write conflict)
      case "P2034": {
        return {
          status: 409,
          response: {
            message: "Operation failed due to concurrent access. Please retry.",
          },
        };
      }

      // Default case for unhandled Prisma errors
      default: {
        console.error(`Unhandled Prisma Error [${error.code}]:`, error.message);
        return {
          status: 500,
          response: {
            message: "Internal server error",
          },
        };
      }
    }
  }
}

export default DatabaseErrorHandler;
