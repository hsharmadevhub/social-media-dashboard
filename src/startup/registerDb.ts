import mongoose from "mongoose";
import config from "config";
import logger from "../core/logging/winston.logger.js";

export default () =>
  mongoose
    .connect(config.get("mongoConnectionStr"), { dbName: "SocialDB" })
    .then(() => logger.info("connected to DB"));
