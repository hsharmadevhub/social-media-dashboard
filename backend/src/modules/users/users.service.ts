import bcrypt from "bcrypt";
import User from "./users.model.js";
import { BadRequestError, NotFoundError } from "../../core/errors/HttpError.js";
import jwt from "jsonwebtoken";
import config from "config";
import type {
  LoginParams,
  RegisterUserParams,
} from "./validators/users.zod.js";
import type { HydratedDocument } from "mongoose";
import createDebug from "debug";

const debug = createDebug("app:users:service");

const encryptPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export async function createUser(
  body: RegisterUserParams
): Promise<HydratedDocument<RegisterUserParams>> {
  // Check if user already exists
  const existing = await User.findOne({ email: body.email });
  if (existing) {
    throw new BadRequestError("user already exists");
  }

  // Encrypt password
  body.password = await encryptPassword(body.password);

  // Create user
  const createdUser = new User(body);
  await createdUser.save();

  debug(JSON.stringify(createdUser));
  return createdUser;
}

export async function login(body: LoginParams): Promise<string> {
  // Find matching user
  const matchingUser = await User.findOne({
    $or: [{ username: body.username }, { email: body.username }],
  });
  if (!matchingUser) {
    throw new NotFoundError("invalid credentials");
  }
  debug("matched user:", JSON.stringify(matchingUser));

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(
    body.password,
    matchingUser.password
  );
  debug("isPasswordValid:", isPasswordValid);

  if (!isPasswordValid) {
    throw new BadRequestError("invalid credentials");
  }

  // Return JWT
  const token = jwt.sign(
    {
      userId: matchingUser._id,
      username: matchingUser.username,
      email: matchingUser.email,
    },
    config.get("jwtSecretKey")
  );

  debug("generated token:", JSON.stringify(token));
  return token;
}
