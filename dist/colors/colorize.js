"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorJson = exports.supportsColor = exports.defaultColors = exports.defaultColorMap = void 0;
const stringify_safe_1 = require("../json-stringify-safe/stringify-safe");
exports.defaultColorMap = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    darkRed: '\x1b[38;2;179;5;15m',
    lightRed: '\x1b[38;2;255;137;149m',
    green: '\x1b[32m',
    darkGreen: '\x1b[38;2;36;119;36m',
    lightGreen: '\x1b[38;2;0;255;127m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    teal: '\x1b[38;2;26;175;192m',
    lightTeal: '\x1b[38;2;31;230;255m',
    darkBlue: '\x1b[38;2;54;124;192m',
    darkYellow: '\x1b[38;2;159;147;45m',
    lightBlue: '\x1b[38;2;120;193;255m',
    purple: '\x1b[38;2;135;38;162m',
    pink: '\x1b[38;2;168;53;143m',
    lightPink: '\x1b[38;2;255;81;216m',
};
exports.defaultColors = {
    separator: 'black',
    string: 'white',
    number: 'magenta',
    boolean: 'cyan',
    null: 'red',
    key: 'purple',
    levelKey: 'teal',
    messageKey: 'darkGreen',
    errorLevel: 'red',
    nonErrorLevel: 'lightTeal',
    nonErrorMessage: 'lightGreen',
    errorMessage: 'red',
    warnLevel: 'yellow',
    fileNameKey: 'darkYellow',
    fileName: 'yellow',
    logCallStackKey: 'blue',
    logCallStack: 'black',
    packageNameKey: 'darkYellow',
    packageName: 'yellow',
    timestampKey: 'pink',
    timestamp: 'lightPink',
    errCallStackKey: 'darkRed',
    errCallStack: 'lightRed',
};
// TODO: this is super beta, consider using Sindre's supports-colors
function supportsColor() {
    const onHeroku = truth(process.env.DYNO) ? true : false;
    const forceNoColor = truth(process.env.FORCE_NO_COLOR) ? true : false;
    const forceColor = truth(process.env.FORCE_COLOR) ? true : false;
    return (!onHeroku && !forceNoColor) || forceColor;
}
exports.supportsColor = supportsColor;
// also counts 'false' as false
function truth(it) {
    return it && it !== 'false' ? true : false;
}
// TODO:colors: support colorizing specific fields like "message"
// TODO:colors: add support for deserializing circual references by incorporating and using 'json-stringify-safe' that i userd here elsewhere but now commented out
// TODO:colors: add support to toggle colors as well as JSON formatting independently
/**
 * Given an object, it returns its JSON representation colored using
 * ANSI escape characters.
 * @param {(Object | string)} json - JSON object to highlighter.
 * @param {Colors} [colors] - A map with the ANSI characters for each supported color.
 * @param {ColorMap} [colorMap] - An object to configure the coloring.
 * @param {number} [spacing=2] - The indentation spaces.
 * @returns {string} Stringified JSON colored with ANSI escape characters.
 */
function colorJson(jsonInput, colorsInput = exports.defaultColors, colorMap = exports.defaultColorMap, spacing) {
    const colors = { ...exports.defaultColors, ...colorsInput };
    let previousMatchedValue = '';
    let isErrorLevel = false;
    let isWarnLevel = false;
    let json;
    if (supportsColor()) {
        if (typeof jsonInput !== 'string')
            json = (0, stringify_safe_1.jsonStringifySafe)(jsonInput, undefined, spacing);
        else
            json = (0, stringify_safe_1.jsonStringifySafe)(JSON.parse(jsonInput), undefined, spacing);
        return (colorMap[colors.separator] +
            json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
                let colorCode = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        colorCode = 'key';
                        // If key is "level" handle it with special color
                        if (/\"level\"/i.test(match)) {
                            colorCode = 'levelKey';
                        }
                        // If key is "message" handle it with special color
                        if (/\"message\"/i.test(match)) {
                            colorCode = 'messageKey';
                        }
                        if (/\"@filename\"/i.test(match)) {
                            colorCode = 'fileNameKey';
                        }
                        if (/\"@logCallStack\"/i.test(match)) {
                            colorCode = 'logCallStackKey';
                        }
                        if (/\"@packageName\"/i.test(match)) {
                            colorCode = 'packageNameKey';
                        }
                        if (/\"@timestamp\"/i.test(match)) {
                            colorCode = 'timestampKey';
                        }
                        if (/\"errCallStack\"/i.test(match)) {
                            colorCode = 'errCallStackKey';
                        }
                    }
                    else {
                        colorCode = 'string';
                        // If the key is "level" then handle value with special color
                        if (/\"level\"/i.test(previousMatchedValue)) {
                            if (/\"error\"/i.test(match)) {
                                colorCode = 'errorLevel';
                                isErrorLevel = true;
                            }
                            else if (/\"warn\"/i.test(match)) {
                                colorCode = 'warnLevel';
                                isWarnLevel = true;
                            }
                            else {
                                colorCode = 'nonErrorLevel';
                            }
                        }
                        // if the key is "message" then handle value with special color
                        if (/\"message\"/i.test(previousMatchedValue)) {
                            if (isErrorLevel) {
                                colorCode = 'errorMessage';
                            }
                            else if (isWarnLevel) {
                                colorCode = 'warnLevel';
                            }
                            else {
                                colorCode = 'nonErrorMessage';
                            }
                        }
                        if (/\"@filename\"/i.test(previousMatchedValue)) {
                            colorCode = 'fileName';
                        }
                        if (/\"@logCallStack\"/i.test(previousMatchedValue)) {
                            colorCode = 'logCallStack';
                        }
                        if (/\"@packageName\"/i.test(previousMatchedValue)) {
                            colorCode = 'packageName';
                        }
                        if (/\"@timestamp\"/i.test(previousMatchedValue)) {
                            colorCode = 'timestamp';
                        }
                        if (/\"errCallStack\"/i.test(previousMatchedValue)) {
                            colorCode = 'errCallStack';
                        }
                    }
                }
                else if (/true|false/.test(match)) {
                    colorCode = 'boolean';
                }
                else if (/null/.test(match)) {
                    colorCode = 'null';
                }
                const color = colorMap[colors[colorCode]] || '';
                previousMatchedValue = match;
                return `\x1b[0m${color}${match}${colorMap[colors.separator]}`;
            }) +
            '\x1b[0m');
    }
    else {
        if (typeof jsonInput !== 'string')
            json = (0, stringify_safe_1.jsonStringifySafe)(jsonInput, undefined, spacing);
        else
            json = (0, stringify_safe_1.jsonStringifySafe)(JSON.parse(jsonInput), undefined, spacing);
        return json;
    }
}
exports.colorJson = colorJson;
