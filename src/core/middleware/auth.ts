import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import type { UserData } from "../types/express-serve-static-core.js";
import { UnauthorizedError } from "../errors/HttpError.js";
import createDebug from "debug";

const debug = createDebug("app:middleware:auth");

export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.session.token;
  const secretKey: string = config.get("jwtSecretKey");

  debug("validating token:", req.session.token);

  if (!token) return new UnauthorizedError();

  try {
    const decodedUser = jwt.verify(token, secretKey) as UserData;
    req.user = decodedUser;
    debug("decoded user:", decodedUser);
    next();
  } catch (err) {
    return new UnauthorizedError("Invalid token");
  }
}
