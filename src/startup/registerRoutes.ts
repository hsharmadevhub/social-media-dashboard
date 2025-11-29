import userRoutes from "../modules/users/users.routes.js";
import type { Express } from "express";
import errorHandler from "../core/middleware/error.js";

export default (app: Express) => {
  app.use("/users", userRoutes);
  app.use(errorHandler);
};