import winston from "winston";

const { combine, timestamp, printf, colorize } = winston.format;

// Custom console log format
const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export default winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    winston.format.errors({ stack: true })
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize({ all: true }), consoleFormat),
    }),
  ],
});