import Ssh2SftpClient, { ConnectOptions } from 'ssh2-sftp-client'
import { SftpClient } from './sftp-client'

export class DelegatedSftpClient implements SftpClient {
    public constructor(
        private readonly ssh2SftpClient: Ssh2SftpClient,
        private readonly connectOptions: ConnectOptions,
    ) {}

    public async connect(): Promise<void> {
        await this.ssh2SftpClient.connect(this.connectOptions)
    }

    public async disconnect(): Promise<void> {
        await this.ssh2SftpClient.end()
    }

    public async put(data: Buffer, path: string): Promise<void> {
        await this.ssh2SftpClient.put(data, path)
    }

    public async delete(path: string): Promise<void> {
        await this.ssh2SftpClient.delete(path)
    }
}
