import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";
import createDebug from "debug";

const debug = createDebug("app:middleware:validate");

type Schemas = {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
};

export default function validateRequest(schemas: Schemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schemas.params) {
      debug("validating request params:", JSON.stringify(req.params));
      const result = schemas.params.safeParse(req.params);
      if (!result.success) return next(result.error);
      req.params = result.data as any;
    }

    if (schemas.query) {
      debug("validating query params:", JSON.stringify(req.query));
      const result = schemas.query.safeParse(req.query);
      if (!result.success) return next(result.error);
      req.query = result.data as any;
    }

    if (schemas.body) {
      debug("validating body params:", JSON.stringify(req.body));
      const result = schemas.body.safeParse(req.body);
      if (!result.success) return next(result.error);
      req.body = result.data;
    }

    next();
  };
}
