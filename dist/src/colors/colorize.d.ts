export interface IDefaultColorMap {
    black: string;
    red: string;
    darkRed: string;
    lightRed: string;
    green: string;
    darkGreen: string;
    lightGreen: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    teal: string;
    lightTeal: string;
    darkBlue: string;
    darkYellow: string;
    lightBlue: string;
    purple: string;
    pink: string;
    lightPink: string;
}
export declare const defaultColorMap: IDefaultColorMap;
export type ColorValue = keyof IDefaultColorMap;
export interface IColorConfiguration {
    separator: ColorValue;
    string: ColorValue;
    number: ColorValue;
    boolean: ColorValue;
    null: ColorValue;
    key: ColorValue;
    levelKey: ColorValue;
    messageKey: ColorValue;
    errorLevel: ColorValue;
    nonErrorLevel: ColorValue;
    nonErrorMessage: ColorValue;
    errorMessage: ColorValue;
    warnLevel: ColorValue;
    fileNameKey: ColorValue;
    fileName: ColorValue;
    logCallStackKey: ColorValue;
    logCallStack: ColorValue;
    packageNameKey: ColorValue;
    packageName: ColorValue;
    timestampKey: ColorValue;
    timestamp: ColorValue;
    errCallStackKey: ColorValue;
    errCallStack: ColorValue;
}
export type ColorItemName = keyof IColorConfiguration;
export declare const defaultColors: IColorConfiguration;
export declare function supportsColor(): boolean;
/**
 * Given an object, it returns its JSON representation colored using
 * ANSI escape characters.
 * @param {(Object | string)} json - JSON object to highlighter.
 * @param {Colors} [colors] - A map with the ANSI characters for each supported color.
 * @param {ColorMap} [colorMap] - An object to configure the coloring.
 * @param {number} [spacing=2] - The indentation spaces.
 * @returns {string} Stringified JSON colored with ANSI escape characters.
 */
export declare function colorJson(jsonInput: any, colorsInput?: Partial<IColorConfiguration>, colorMap?: IDefaultColorMap, spacing?: number): string;
