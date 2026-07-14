"use strict";
/**
 * Even the bare `Buffer` type name resolves fine as a parameter annotation
 * wherever it's used, but its own prototype methods (`.toString(encoding)`,
 * `.length`) and static `Buffer.concat()` don't always resolve as cleanly --
 * @types/node's Buffer declaration is an unusually complex one (it extends
 * Uint8Array via global augmentation). Routing the handful of call sites
 * that actually touch these through here keeps that fully contained, same
 * as fs.ts/process.ts/httpServer.ts already do for their own modules.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferToString = bufferToString;
exports.bufferLength = bufferLength;
exports.concatBuffersToString = concatBuffersToString;
function bufferToString(chunk, encoding = "utf8") {
    return chunk.toString(encoding);
}
function bufferLength(chunk) {
    return chunk.length;
}
function concatBuffersToString(chunks, encoding = "utf8") {
    return Buffer.concat(chunks).toString(encoding);
}
