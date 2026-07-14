"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathJoin = pathJoin;
exports.pathBasename = pathBasename;
exports.pathDirname = pathDirname;
exports.pathRelative = pathRelative;
exports.fileExistsSync = fileExistsSync;
exports.readTextFileIfExists = readTextFileIfExists;
exports.writeTextFile = writeTextFile;
exports.appendTextFile = appendTextFile;
exports.makeDirRecursive = makeDirRecursive;
exports.deleteFileIfExists = deleteFileIfExists;
exports.randomHex = randomHex;
const fs_1 = require("fs");
const fsPromises = __importStar(require("fs/promises"));
const nodePath = __importStar(require("path"));
const crypto_1 = require("crypto");
/**
 * Every filesystem/path/crypto touchpoint a consumer needs goes through
 * this one file, exporting hand-declared signatures rather than
 * re-exporting Node's own (ambient, environment-dependent) module types.
 */
function pathJoin(...segments) {
    return nodePath.join(...segments);
}
function pathBasename(filePath, ext) {
    return nodePath.basename(filePath, ext);
}
function pathDirname(filePath) {
    return nodePath.dirname(filePath);
}
function pathRelative(from, to) {
    return nodePath.relative(from, to);
}
function fileExistsSync(filePath) {
    return (0, fs_1.existsSync)(filePath);
}
function isEnoent(err) {
    return typeof err === "object" && err !== null && "code" in err && err.code === "ENOENT";
}
/** Returns the file's text content, or null if it doesn't exist. Rethrows
 *  any other error (permissions, etc.) rather than masking it as "missing". */
async function readTextFileIfExists(filePath) {
    try {
        return await fsPromises.readFile(filePath, "utf8");
    }
    catch (err) {
        if (isEnoent(err))
            return null;
        throw err;
    }
}
async function writeTextFile(filePath, content) {
    await fsPromises.writeFile(filePath, content, "utf8");
}
async function appendTextFile(filePath, content) {
    await fsPromises.appendFile(filePath, content, "utf8");
}
async function makeDirRecursive(dirPath) {
    await fsPromises.mkdir(dirPath, { recursive: true });
}
/** No-op if the file doesn't already exist. */
async function deleteFileIfExists(filePath) {
    try {
        await fsPromises.unlink(filePath);
    }
    catch (err) {
        if (!isEnoent(err))
            throw err;
    }
}
function randomHex(byteLength) {
    return (0, crypto_1.randomBytes)(byteLength).toString("hex");
}
