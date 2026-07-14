"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecFileError = void 0;
exports.getEnvVar = getEnvVar;
exports.getAllEnvVars = getAllEnvVars;
exports.execFileText = execFileText;
exports.spawnWithControlChannel = spawnWithControlChannel;
const child_process_1 = require("child_process");
function getEnvVar(name) {
    return process.env[name];
}
/** A copy of this process's environment, safe to spread into a spawned
 *  child's own env (e.g. `{ ...getAllEnvVars(), FOO: "bar" }`). */
function getAllEnvVars() {
    return { ...process.env };
}
/** What a failed execFileText() rejects with. A real Error subclass (not a
 *  plain object) so rejecting with one follows normal Promise-rejection
 *  conventions -- declared once, centrally, instead of intersected with
 *  Node's ambient `NodeJS.ErrnoException` at each call site. */
class ExecFileError extends Error {
}
exports.ExecFileError = ExecFileError;
function execFileText(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        (0, child_process_1.execFile)(command, args, { encoding: "utf8", ...options }, (error, stdout, stderr) => {
            if (error) {
                const errWithFields = error;
                const execErr = new ExecFileError(error.message);
                execErr.killed = errWithFields.killed;
                execErr.signal = errWithFields.signal;
                execErr.stderr = typeof stderr === "string" ? stderr : undefined;
                execErr.code = errWithFields.code;
                reject(execErr);
                return;
            }
            resolve({
                stdout: typeof stdout === "string" ? stdout : "",
                stderr: typeof stderr === "string" ? stderr : "",
            });
        });
    });
}
/** Always requests a 4-slot stdio pipe array (stdin/stdout/stderr + one
 *  extra control channel). */
function spawnWithControlChannel(command, args, options) {
    const child = (0, child_process_1.spawn)(command, args, {
        cwd: options.cwd,
        env: options.env,
        stdio: ["pipe", "pipe", "pipe", "pipe"],
    });
    const controlStream = child.stdio[3];
    const hasControlStream = controlStream !== null && controlStream !== undefined && "on" in controlStream && "write" in controlStream;
    return {
        onStdout: (listener) => {
            child.stdout.on("data", listener);
        },
        onStderr: (listener) => {
            child.stderr.on("data", listener);
        },
        writeStdin: (data) => {
            child.stdin.write(data, "utf8");
        },
        onControlData: (listener) => {
            if (hasControlStream)
                controlStream.on("data", listener);
        },
        writeControl: (data) => {
            if (hasControlStream)
                controlStream.write(data);
        },
        onError: (listener) => {
            child.on("error", listener);
        },
        onClose: (listener) => {
            child.on("close", listener);
        },
        kill: (signal) => {
            child.kill(signal);
        },
    };
}
