declare global {
    interface Console {
        /**
         * Priority 0
         */
        error(...args: any[]): void;
        /**
         * Priority 1
         */
        warn(...args: any[]): void;
        /**
         * Priority 2
         */
        info(...args: any[]): void;
        /**
         * Priority 3
         */
        http(...args: any[]): void;
        /**
         * Priority 4
         */
        verbose(...args: any[]): void;
        /**
         * Priority 5
         */
        debug(...args: any[]): void;
        /**
         * Priority 6 (critical)
         */
        silly(...args: any[]): void;
        /**
         * Priority 2 (same as console.info)
         */
        log(...args: any[]): void;
    }
}
export declare function FormatErrorObject(object: any): string;
export declare function GetLogLevel(): string;
export declare function SetLogLevel(level: string): void;
export declare function NativeConsoleLog(...args: any[]): void;
/**
 * This function adapts a logger to the console.
 *
 * @param {({ logLevel?: LOG_LEVEL; debugString?: boolean; customOptions?: object })} [options] - An optional parameter that can be an object with optional properties 'logLevel', 'debugString', and 'customOptions'. 'logLevel' sets the level of logging. 'debugString' toggles whether to output a debug string. 'customOptions' can be any object that contains custom settings for the logger.
 *
 * @example
 * // Default behavior with no options
 * LoggerAdaptToConsole();
 *
 * @example
 * // Pass an object with logLevel and debugString
 * LoggerAdaptToConsole({ logLevel: LOG_LEVEL.INFO, debugString: true });
 *
 * @example
 * // Override default options and add customOptions
 * LoggerAdaptToConsole({ logLevel: LOG_LEVEL.ERROR, debugString: false, customOptions: { applicationName: 'my-app' } });
 */
export declare function LoggerAdaptToConsole(options?: {
    logLevel?: LOG_LEVEL;
    debugString?: boolean;
    customOptions?: object;
}): void;
/**
 * It takes the arguments passed to the console.log function and logs them using Winston
 * @param {any[]} args - any[] - the arguments passed to the console.log function
 * @param {LOG_LEVEL} level - LOG_LEVEL
 * @param {object} [customOptions] - object - an optional parameter that can be an object with custom settings for the logger
 */
export declare function logUsingWinston(args: any[], level: LOG_LEVEL, customOptions?: object): void;
/**
 * Each level is given a specific integer priority.
 * The higher the priority the more important the message is considered to be,
 * and the lower the corresponding integer priority.
 * For example, as specified exactly
 * in RFC5424 the syslog levels are prioritized from 0 to 7 (highest to lowest).
 */
export declare enum LOG_LEVEL {
    /**
     * Priority 0
     */
    error = "error",
    /**
     * Priority 1
     */
    warn = "warn",
    /**
     * Priority 2
     */
    info = "info",
    /**
     * Priority 3
     */
    http = "http",
    /**
     * Priority 4
     */
    verbose = "verbose",
    /**
     * Priority 5
     */
    debug = "debug",
    /**
     * Priority 6
     */
    silly = "silly"
}
export declare function LoggerRestoreConsole(): void;
export declare function overrideStdOut(): {
    originalWrite: {
        (buffer: Uint8Array | string, cb?: (err?: Error) => void): boolean;
        (str: Uint8Array | string, encoding?: BufferEncoding, cb?: (err?: Error) => void): boolean;
    };
    outputText: string[];
};
export declare function restoreStdOut(originalWrite: any): void;
