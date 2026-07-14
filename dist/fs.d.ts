/**
 * Every filesystem/path/crypto touchpoint a consumer needs goes through
 * this one file, exporting hand-declared signatures rather than
 * re-exporting Node's own (ambient, environment-dependent) module types.
 */
export declare function pathJoin(...segments: string[]): string;
export declare function pathBasename(filePath: string, ext?: string): string;
export declare function pathDirname(filePath: string): string;
export declare function pathRelative(from: string, to: string): string;
export declare function fileExistsSync(filePath: string): boolean;
/** Returns the file's text content, or null if it doesn't exist. Rethrows
 *  any other error (permissions, etc.) rather than masking it as "missing". */
export declare function readTextFileIfExists(filePath: string): Promise<string | null>;
export declare function writeTextFile(filePath: string, content: string): Promise<void>;
export declare function appendTextFile(filePath: string, content: string): Promise<void>;
export declare function makeDirRecursive(dirPath: string): Promise<void>;
/** No-op if the file doesn't already exist. */
export declare function deleteFileIfExists(filePath: string): Promise<void>;
export declare function randomHex(byteLength: number): string;
