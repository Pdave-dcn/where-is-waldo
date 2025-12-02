import type { Request } from "express";
import type { Logger } from "pino";

/**
 * Creates a scoped logger for a specific controller action with request tracing.
 */
const createActionLogger = (
  controllerLogger: Logger,
  action: string,
  req: Request
): Logger => {
  return controllerLogger.child({
    action,
    requestId: req.logContext?.requestId,
  });
};

export default createActionLogger;
