import { ILogger } from "./logger.js";

/**
 * An implementation of a singleton logger instance within a container.
 */
export class LoggerInstanceContainer {

    private loggerInstance: ILogger | null = null;

    constructor(loggerInstance: ILogger) {
        this.loggerInstance = loggerInstance
    }

    /**
     * Get the logger instance.
     * @returns ILogger instance
     */
    getLogger(): ILogger {
        if (!this.loggerInstance) {
            throw new Error("Logger instance has not been set.");
        }
        return this.loggerInstance;
    }
}