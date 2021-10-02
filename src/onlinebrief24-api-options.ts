import { SftpClient } from './sftp/sftp-client'

export interface OnlineBrief24ApiCredentials {
    username: string
    password: string
}

export interface OnlineBrief24ApiConnectionOptions {
    host?: string
    port?: number
}

export interface OnlineBrief24ApiOptions {
    credentials?: OnlineBrief24ApiCredentials
    connection?: OnlineBrief24ApiConnectionOptions
    sftpClient?: SftpClient
    uploadPath?: string
}
