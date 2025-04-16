import { Request, Response, NextFunction } from "express";
import { ServiceError } from "../services/userService";
import { z } from "zod";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof z.ZodError) {
    res.status(400).json({
      error: {
        code: 400,
        message: "Validation error",
        details: err.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      },
    });
  } else if (err instanceof ServiceError) {
    res.status(err.statusCode).json({
      error: {
        code: err.statusCode,
        message: err.message,
      },
    });
  } else {
    console.error(err);
    res.status(500).json({
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}
