"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Users https://v8.dev/docs/stack-trace-api to get stack trace
 * @returns array of CallSites
 */
function callsites() {
    const _prepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;
    const stck = new Error().stack.slice(1);
    Error.prepareStackTrace = _prepareStackTrace;
    return stck;
}
exports.default = callsites;
