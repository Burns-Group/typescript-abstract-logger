const LOG_LEVELS: Record<string, number> = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

interface ILogger {
    /**
     * Logs a message at the INFO log level by default.
     * @param message The message to log
     */
    log(message: string): void;
    /**
     * Logs a message at the specified log level.
     * @param level The log level to use
     * @param message The message to log
     */
    log(level: keyof typeof LOG_LEVELS, message: string): void;
    /**
     * Logs a message at the ERROR log level.
     * @param message The message to log
     */
    error(message: string): void;
    /**
     * Logs a message at the WARN log level.
     * @param message The message to log
     */
    warn(message: string): void;

    /**
     * Logs a message at the INFO log level.
     * @param message The message to log
     */
    info(message: string): void;

    /**
     * Logs a message at the HTTP log level.
     * @param message The message to log
     */
    http(message: string): void;

    /**
     * Logs a message at the VERBOSE log level.
     * @param message The message to log
     */
    verbose(message: string): void;

    /**
     * Logs a message at the DEBUG log level.
     * @param message The message to log
     */
    debug(message: string): void;

    /**
     * Logs a message at the SILLY log level.
     * @param message The message to log
     */
    silly(message: string): void;
}

export { ILogger, LOG_LEVELS };