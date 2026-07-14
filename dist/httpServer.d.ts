export interface SimpleHttpRequest {
    method: string | undefined;
    url: string | undefined;
    authorizationHeader: string | undefined;
    onData(listener: (chunk: Buffer) => void): void;
    onEnd(listener: () => void): void;
    onError(listener: (err: Error) => void): void;
    destroy(): void;
}
export interface SimpleHttpResponse {
    writeHead(statusCode: number, headers: Record<string, string>): void;
    end(body?: string): void;
    readonly headersSent: boolean;
}
export interface SimpleHttpServer {
    listen(port: number, host: string, onListening: () => void): void;
    onError(listener: (err: Error) => void): void;
    close(onClosed: () => void): void;
    /** null if the server isn't currently bound to a port. */
    getBoundPort(): number | null;
}
export declare function createHttpServer(handler: (req: SimpleHttpRequest, res: SimpleHttpResponse) => void): SimpleHttpServer;
