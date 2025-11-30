import type { NextFunction, Request, Response } from "express";
import { createUser, login } from "./users.service.js";
import type {
  LoginParams,
  RegisterUserParams,
} from "./validators/users.zod.js";
import { BadRequestError } from "../../core/errors/HttpError.js";
import createDebug from "debug";

const debug = createDebug("app:users:controller");

export async function registerUserController(
  req: Request<{}, {}, RegisterUserParams>,
  res: Response,
  next: NextFunction
) {
  debug("request body: ", JSON.stringify(req.body));
  const user = await createUser(req.body);
  debug("created user: ", JSON.stringify(user));

  return res
    .status(201)
    .send({ message: `user ${user.username} created successfully` });
}

export async function loginController(
  req: Request<{}, {}, LoginParams>,
  res: Response,
  next: NextFunction
) {
  if (req.session?.token) {
    throw new BadRequestError("user already logged in");
  }

  const token = await login(req.body);
  req.session.token = token;

  return res
    .status(200)
    .send({ message: `user ${req.body.username} logged in successfully` });
}
