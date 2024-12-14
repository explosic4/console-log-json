export type EntryProcessor = (key: string, value: any) => any;
/**
 *  Stringifies JSON objects into strings in a safe way so that it can handle recursion and cyclical references
 *
 * @param obj the object to serialize
 * @param serializer custom serializer
 * @param indent indent for JSON formatting
 * @param decycler a function to use when a cyclical refernce is found
 * @returns the JSON string represantation
 */
export declare function jsonStringifySafe(obj: any, serializer?: EntryProcessor, indent?: string | number, decycler?: EntryProcessor): string;
export declare function getSerialize(serializer?: EntryProcessor, decycler?: EntryProcessor): EntryProcessor;
