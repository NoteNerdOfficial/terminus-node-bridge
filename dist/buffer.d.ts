/**
 * Even the bare `Buffer` type name resolves fine as a parameter annotation
 * wherever it's used, but its own prototype methods (`.toString(encoding)`,
 * `.length`) and static `Buffer.concat()` don't always resolve as cleanly --
 * @types/node's Buffer declaration is an unusually complex one (it extends
 * Uint8Array via global augmentation). Routing the handful of call sites
 * that actually touch these through here keeps that fully contained, same
 * as fs.ts/process.ts/httpServer.ts already do for their own modules.
 */
export declare function bufferToString(chunk: Buffer, encoding?: BufferEncoding): string;
export declare function bufferLength(chunk: Buffer): number;
export declare function concatBuffersToString(chunks: Buffer[], encoding?: BufferEncoding): string;
