import express from "express";
import { loginController, logoutController, registerUserController } from "./users.controller.js";
import { RegisterUserSchema, LoginSchema } from "./validators/users.zod.js";
import validate from "../../core/middleware/validate.js";

const userRoutes = express.Router();

userRoutes.post(
  "/register",
  validate({ body: RegisterUserSchema }),
  registerUserController
);
userRoutes.post("/login", validate({ body: LoginSchema }), loginController);
userRoutes.post("/logout", logoutController);

export default userRoutes;
