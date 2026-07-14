/**
 * Even the bare `Buffer` type name resolves fine as a parameter annotation
 * wherever it's used, but its own prototype methods (`.toString(encoding)`,
 * `.length`) and static `Buffer.concat()` don't always resolve as cleanly --
 * @types/node's Buffer declaration is an unusually complex one (it extends
 * Uint8Array via global augmentation). Routing the handful of call sites
 * that actually touch these through here keeps that fully contained, same
 * as fs.ts/process.ts/httpServer.ts already do for their own modules.
 */

export function bufferToString(chunk: Buffer, encoding: BufferEncoding = "utf8"): string {
  return chunk.toString(encoding);
}

export function bufferLength(chunk: Buffer): number {
  return chunk.length;
}

export function concatBuffersToString(chunks: Buffer[], encoding: BufferEncoding = "utf8"): string {
  return Buffer.concat(chunks).toString(encoding);
}
