import userRoutes from "../modules/users/users.routes.js";
import type { Express } from "express";
import errorHandler from "../core/middleware/error.js";
import postRoutes from "../modules/posts/posts.routes.js";
import authenticateToken from "../core/middleware/auth.js";

export default (app: Express) => {
  app.use("/users", userRoutes);
  app.use("/posts", authenticateToken, postRoutes);
  app.use(errorHandler);
};