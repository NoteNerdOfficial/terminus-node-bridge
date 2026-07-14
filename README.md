# terminus-node-bridge

Hand-typed wrappers around a handful of Node.js built-ins (`fs`, `child_process`, `http`, `crypto`, `path`, `process.env`), published as a standalone package rather than living inside a consuming project's own source tree.

## Why

Some automated TypeScript-aware tooling doesn't resolve Node's ambient/built-in module declarations (`declare module "child_process"`, etc.) inside the source tree it's scanning, which can cause `@typescript-eslint/no-unsafe-*`-style findings on any file that directly imports them -- regardless of how that file's own code is typed. Moving those imports into a separately published package sidesteps this: a regular npm package's own exported types resolve normally, since that's ordinary module resolution rather than Node's special built-in mechanism.

Every export here has a hand-declared, Node-ambient-type-free public signature (no `NodeJS.*` types, no raw `ChildProcess`/`http.Server` re-exports) -- only `Buffer` and `Error` are used, since those are global types that resolve independently of a specific module import.

## Usage

```ts
import { pathJoin, readTextFileIfExists, execFileText, spawnWithControlChannel, createHttpServer } from "terminus-node-bridge";
```

See `src/fs.ts`, `src/process.ts`, and `src/httpServer.ts` for the full API.

## Build

```sh
npm install
npm run build
```
