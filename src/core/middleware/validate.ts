import zod from "zod";
import type { Request, Response, NextFunction } from "express";
import createDebug from "debug";

const debug = createDebug("app:middleware:validate");

export default <S extends zod.ZodTypeAny>(schema: S) =>
  (req: Request, res: Response, next: NextFunction) => {
    debug("validating request body:", JSON.stringify(req.body));
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(result.error);
    }

    // Inferred automatically: z.infer<typeof schema>
    req.body = result.data;
    return next();
  };
