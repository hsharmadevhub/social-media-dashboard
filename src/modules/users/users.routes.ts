import express from "express";
import { loginController, registerUserController } from "./users.controller.js";
import { RegisterUserSchema, LoginSchema } from "./validators/users.zod.js";
import validate from "../../core/middleware/validate.js";

const userRoutes = express.Router();

userRoutes.post(
  "/register",
  validate(RegisterUserSchema),
  registerUserController
);
userRoutes.post("/login", validate(LoginSchema), loginController);

export default userRoutes;
