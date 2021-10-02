export interface SftpClient {
    connect(): Promise<void>
    disconnect(): Promise<void>
    put(data: Buffer, path: string): Promise<void>
    delete(path: string): Promise<void>
}
