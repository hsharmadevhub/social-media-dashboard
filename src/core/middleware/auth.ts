import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import type { UserData } from "../types/express-serve-static-core.js";
import { UnauthorizedError } from "../errors/HttpError.js";

export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.session.token;
  const secretKey: string = config.get("jwtSecretKey");

  if (!token) return new UnauthorizedError();

  try {
    const decodedUser = jwt.verify(token, secretKey) as UserData;
    req.user = decodedUser;
    next();
  } catch (err) {
    return new UnauthorizedError("Invalid token");
  }
}
