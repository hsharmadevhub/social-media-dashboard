import zod from "zod";
import { passwordRules } from "./shared.js";

export const RegisterUserSchema = zod.object({
  email: zod.string().email(),
  username: zod.string(),
  password: zod.string().superRefine((value, ctx) => {
    for (const rule of passwordRules) {
      if (!rule.validate(value))
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: rule.message,
          path: ["password"],
        });
    }
  }),
});

export const LoginSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

export type RegisterUserParams = zod.infer<typeof RegisterUserSchema>;
export type LoginParams = zod.infer<typeof LoginSchema>;
