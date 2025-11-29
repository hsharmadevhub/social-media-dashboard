import express from "express";
import registerRoutes from "./registerRoutes.js";
import session from "express-session";
import config from "config";
import registerDb from "./registerDb.js";
import registerLogging from "../core/logging/morgan.logger.js";
import logger from "../core/logging/winston.logger.js";

const app = express();
app.use(express.json());
app.use(
  session({
    secret: config.get("jwtSecretKey"),
    resave: true,
    saveUninitialized: true,
  })
);

registerLogging(app);
registerDb();
registerRoutes(app);

const PORT = 5001;
app.listen(PORT, () => logger.info("Server is running"));