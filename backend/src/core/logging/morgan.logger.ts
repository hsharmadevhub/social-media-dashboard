import morgan from "morgan";
import type { Express } from "express";
import logger from "./winston.logger.js";

export default (app: Express) =>
  app.use(
    morgan("combined", {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );
