export {}; // Makes this a module so augmentation works

declare global {
  namespace Express {
    interface LogContext {
      requestId: string;
      module: string;
      [key: string]: unknown;
    }

    interface Request {
      logContext?: LogContext;
    }
  }
}
