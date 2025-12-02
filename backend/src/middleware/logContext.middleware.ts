import { Request, Response, NextFunction } from "express";

/**
 * Express middleware factory that attaches logging context to incoming requests.
 */
const attachLogContext = (moduleName: string) => {
  return (
    req: Request & { logContext?: Express.LogContext },
    _res: Response,
    next: NextFunction
  ) => {
    const requestId =
      (req.headers?.["x-request-id"] as string | undefined) ??
      `req-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

    req.logContext = {
      module: moduleName,
      requestId,
      ip: req.ip ?? "unknown",
    };

    next();
  };
};

export default attachLogContext;
