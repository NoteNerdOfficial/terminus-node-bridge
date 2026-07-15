export declare function getEnvVar(name: string): string | undefined;
/** A copy of this process's environment, safe to spread into a spawned
 *  child's own env (e.g. `{ ...getAllEnvVars(), FOO: "bar" }`). */
export declare function getAllEnvVars(): Record<string, string | undefined>;
/** Hand-declared instead of relying on `util.promisify(execFile)`'s own
 *  inferred/overloaded return type -- see fs.ts's file comment. */
export interface ExecFileResult {
    stdout: string;
    stderr: string;
}
export interface ExecFileOptions {
    cwd?: string;
    timeout?: number;
    maxBuffer?: number;
    env?: Record<string, string | undefined>;
}
/** What a failed execFileText() rejects with. A real Error subclass (not a
 *  plain object) so rejecting with one follows normal Promise-rejection
 *  conventions -- declared once, centrally, instead of intersected with
 *  Node's ambient `NodeJS.ErrnoException` at each call site. */
export declare class ExecFileError extends Error {
    killed?: boolean;
    signal?: string | null;
    stderr?: string;
    code?: number | string | null;
}
export declare function execFileText(command: string, args: string[], options?: ExecFileOptions): Promise<ExecFileResult>;
export interface SpawnedProcess {
    onStdout(listener: (chunk: Buffer) => void): void;
    onStderr(listener: (chunk: Buffer) => void): void;
    writeStdin(data: string): void;
    /** The control channel (fd 3), if the child was actually given one
     *  (stdio slot 3 as a pipe) -- matches the protocol resources/pty_helper.py
     *  (in the terminus repo) speaks over fd 3. */
    onControlData(listener: (chunk: Buffer) => void): void;
    writeControl(data: string): void;
    onError(listener: (err: Error) => void): void;
    onClose(listener: (code: number | null) => void): void;
    kill(signal: string): void;
}
export interface SpawnOptions {
    cwd: string;
    env: Record<string, string | undefined>;
}
/** Always requests a 4-slot stdio pipe array (stdin/stdout/stderr + one
 *  extra control channel). */
export declare function spawnWithControlChannel(command: string, args: string[], options: SpawnOptions): SpawnedProcess;
