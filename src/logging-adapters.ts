import { LOG_LEVELS } from "./logger.js";
import { ILogger } from "./logger.js";

interface IWinstonLogger {
    log(level: keyof typeof LOG_LEVELS, message: string): void;
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
    http(message: string): void;
    verbose(message: string): void;
    debug(message: string): void;
    silly(message: string): void;
}

class WinstonLogAdapter implements ILogger {

    private logger: IWinstonLogger;

    constructor(logger: IWinstonLogger) {
        this.logger = logger;
    }

    log(message: string): void;
    log(level: string, message: string): void;
    log(levelOrMessage: string, message?: string): void { // why doesn't typescript allow overloads :(
        if (message) {
            // Called as log(level, message)
            const level = (levelOrMessage.toLowerCase() as keyof typeof LOG_LEVELS);

            if (LOG_LEVELS[level]) {
                this.logger.log(level, message);
            } else {
                this.logger.warn(`Unknown log level "${levelOrMessage}", defaulting to info.`);
                this.logger.info(message);
            }
        } else {
            // Called as log(message)
            this.logger.info(levelOrMessage);
        }
    }

    error(message: string): void {
        this.logger.error(message);
    }

    warn(message: string): void {
        this.logger.warn(message);
    }

    info(message: string): void {
        this.logger.info(message);
    }

    http(message: string): void {
        this.logger.http(message);
    }

    verbose(message: string): void {
        this.logger.verbose(message);
    }

    debug(message: string): void {
        this.logger.debug(message);
    }

    silly(message: string): void {
        this.logger.silly(message);
    }
}

interface IConsoleLogger {
    log(message: string): void;
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
    debug(message: string): void;
}

class ConsoleLogAdapter implements ILogger {
    private logger: IConsoleLogger;

    constructor(console: IConsoleLogger) {
        this.logger = console;
    }
    
    log(message: string): void;
    log(level: string, message: string): void;
    log(levelOrMessage: string, message?: string): void { // why doesn't typescript allow overloads :(
        if (message) {
            // Called as log(level, message)
            const level = (levelOrMessage.toLowerCase() as keyof typeof LOG_LEVELS);

            switch (level) {
                case "error": this.error(message); break;
                case "warn": this.warn(message); break;
                case "info": this.info(message); break;
                case "http": this.http(message); break;
                case "verbose": this.verbose(message); break;
                case "debug": this.debug(message); break;
                case "silly": this.silly(message); break;
                default: this.log(`[LOG:${level}] ${message}`);
            }
        } else {
            // Called as log(message)
            this.info(levelOrMessage);
        }
    }

    error(message: string): void {
        this.logger.error(`[ERROR] ${message}`);
    }

    warn(message: string): void {
        this.logger.warn(`[WARN] ${message}`);
    }

    info(message: string): void {
        this.logger.info(`[INFO] ${message}`);
    }

    http(message: string): void {
        this.logger.log(`[HTTP] ${message}`);
    }

    verbose(message: string): void {
        this.logger.log(`[VERBOSE] ${message}`);
    }

    debug(message: string): void {
        if (this.logger.debug) {
            this.logger.debug(`[DEBUG] ${message}`);
        } else {
            this.logger.log(`[DEBUG] ${message}`);
        }
    }

    silly(message: string): void {
        this.logger.log(`[SILLY] ${message}`);
    }
}

export { WinstonLogAdapter, ConsoleLogAdapter };