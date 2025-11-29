import { ZodError } from "zod";
import { HttpError } from "../errors/HttpError.js";
import type { Request, Response, NextFunction } from "express";
import logger from "../logging/winston.logger.js";

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
  });

  // Zod errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "validation failed",
      errors: err.issues.map((e) => ({
        path: e.path.map(String),
        message: e.message,
      })),
    });
  }

  // HttpError
  if (err instanceof HttpError) {
    return res.status(err.statusCode ?? 500).json({
      message: err.message ?? "internal server error",
    });
  }
}
