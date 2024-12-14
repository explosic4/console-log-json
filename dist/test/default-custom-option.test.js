"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:object-literal-sort-keys */
const chai_1 = require("chai");
const src_1 = require("../src");
const sinon_1 = __importDefault(require("sinon"));
describe('logger with custom options', () => {
    const sandbox = sinon_1.default.createSandbox();
    // The below is needed for testing purposes only.
    // For some reason if these are not initialized sinon is unable to stub out the environment variable
    process.env.CONSOLE_LOG_JSON_NO_STACK_FOR_NON_ERROR = '';
    process.env.CONSOLE_LOG_JSON_NO_FILE_NAME = '';
    process.env.CONSOLE_LOG_JSON_NO_PACKAGE_NAME = '';
    process.env.CONSOLE_LOG_JSON_NO_TIME_STAMP = '';
    process.env.CONSOLE_LOG_JSON_NO_NEW_LINE_CHARACTERS = '';
    process.env.CONSOLE_LOG_JSON_DISABLE_AUTO_PARSE = '';
    process.env.CONSOLE_LOG_COLORIZE = '';
    afterEach(() => {
        sandbox.restore();
    });
    it('logs error in correct shape', async () => {
        const { originalWrite, outputText } = (0, src_1.overrideStdOut)();
        await (0, src_1.LoggerAdaptToConsole)({ customOptions: { hello: 'world' } });
        try {
            // action
            (0, src_1.NativeConsoleLog)('testing native log');
            await console.error('some string', new src_1.ErrorWithContext('error \r\nobject', { 'extra-context': 'extra-context' }));
        }
        finally {
            (0, src_1.restoreStdOut)(originalWrite);
            (0, src_1.LoggerRestoreConsole)();
        }
        // assert
        console.log(outputText[0]);
        console.log(outputText[1]);
        (0, chai_1.expect)(outputText[0]).equal('testing native log\n');
        const testObj = JSON.parse(stripTimeStamp(outputText[1]));
        delete testObj['@filename'];
        delete testObj.errCallStack;
        delete testObj['@logCallStack'];
        (0, chai_1.expect)(testObj).eql({
            level: 'error',
            message: 'some string  - error object',
            '@errorObjectName': 'Error',
            '@packageName': 'console-log-json',
            'extra-context': 'extra-context',
            hello: 'world',
        });
        (0, chai_1.expect)(JSON.parse(outputText[1]).errCallStack.startsWith('Error: error object\n    at ')).eql(true, 'starts with specific text');
    });
});
it('logs error in correct shape with multiple properties', async () => {
    const { originalWrite, outputText } = (0, src_1.overrideStdOut)();
    await (0, src_1.LoggerAdaptToConsole)({ customOptions: { hello: 'world', leeroy: 'jenkins' } });
    try {
        // action
        (0, src_1.NativeConsoleLog)('testing native log');
        await console.error('some string', new src_1.ErrorWithContext('error \r\nobject', { 'extra-context': 'extra-context' }));
    }
    finally {
        (0, src_1.restoreStdOut)(originalWrite);
        (0, src_1.LoggerRestoreConsole)();
    }
    // assert
    console.log(outputText[0]);
    console.log(outputText[1]);
    (0, chai_1.expect)(outputText[0]).equal('testing native log\n');
    const testObj = JSON.parse(stripTimeStamp(outputText[1]));
    delete testObj['@filename'];
    delete testObj.errCallStack;
    delete testObj['@logCallStack'];
    (0, chai_1.expect)(testObj).eql({
        level: 'error',
        message: 'some string  - error object',
        '@errorObjectName': 'Error',
        '@packageName': 'console-log-json',
        'extra-context': 'extra-context',
        hello: 'world',
        leeroy: 'jenkins'
    });
    (0, chai_1.expect)(JSON.parse(outputText[1]).errCallStack.startsWith('Error: error object\n    at ')).eql(true, 'starts with specific text');
});
const stripTimeStamp = (input) => {
    const obj = JSON.parse(input);
    delete obj['@timestamp'];
    return JSON.stringify(obj);
};
//# sourceMappingURL=default-custom-option.test.js.map