import mongoose from "mongoose";
import { isEmailValid, passwordRules } from "./validators/shared.js";
import type { RegisterUserParams } from "./validators/users.zod.js";

const userSchema = new mongoose.Schema<RegisterUserParams>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: [
      {
        validator: isEmailValid,
        message: "Email must be valid",
      },
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    validate: passwordRules.map((rule) => ({
      validator: rule.validate,
      message: rule.message,
    })),
  },
});

export default mongoose.model("User", userSchema);
