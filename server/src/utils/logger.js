import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

// Define a custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create a logger instance
const logger = createLogger({
  level: 'info', // Set the minimum log level
  format: combine(
    colorize(), // Colorize the output
    timestamp(), // Add a timestamp
    logFormat // Use the custom log format
  ),
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to a file
    new transports.File({ filename: 'logs/combined.log' }) // Log all levels to a file
  ]
});

export { logger }; 