import AdmZip from 'adm-zip'
import { join as joinPath } from 'path'
import Ssh2SftpClient from 'ssh2-sftp-client'
import { v4 as generateV4Uuid } from 'uuid'
import { generateFileName } from './generate-file-name'
import { hasOwnProperty } from './has-own-property'
import { OnlineBrief24ApiOptions } from './onlinebrief24-api-options'
import { PrintLetterOptions } from './print-letter-options'
import { DelegatedSftpClient } from './sftp/delegated-sftp-client'
import { SftpClient } from './sftp/sftp-client'

const ONLINE_BRIEF_24_API_SERVER_HOST = 'api.onlinebrief24.de'
const ONLINE_BRIEF_24_API_SERVER_PORT = 22
const ONLINE_BRIEF_24_API_UPLOAD_PATH = '/upload/api'

export class OnlineBrief24Api {
    private sftpClient: SftpClient

    public constructor(private readonly options: OnlineBrief24ApiOptions) {
        this.sftpClient = this.options.sftpClient ?? this.createDelegatedSftpClient()
    }

    public async printSingleLetter(printLetterOptions: PrintLetterOptions): Promise<string> {
        const fileName = generateFileName(printLetterOptions)
        const filePath = this.getRemoteFilePath(fileName)
        const { pdfData } = printLetterOptions

        await this.sftpClient.connect()
        await this.sftpClient.put(pdfData, filePath)
        await this.sftpClient.disconnect()

        return fileName
    }

    public async printMultipleLetters(printLetterOptions: PrintLetterOptions[]): Promise<string[]> {
        const archive = new AdmZip()
        const fileNames = printLetterOptions.map((options) => {
            const fileName = generateFileName(options)
            archive.addFile(fileName, options.pdfData)

            return fileName
        })

        await this.sftpClient.connect()
        const archiveFilePath = this.getRemoteFilePath(`${generateV4Uuid()}.zip`)
        await this.sftpClient.put(archive.toBuffer(), archiveFilePath)
        await this.sftpClient.disconnect()

        return fileNames
    }

    public async cancelLetterPrint(printHandler: string): Promise<boolean> {
        await this.sftpClient.connect()
        try {
            await this.sftpClient.delete(this.getRemoteFilePath(printHandler))
        } catch (error: unknown) {
            // The error code 2 indicates that the file that shall be deleted doesn't exist. In the specific case of
            // this api that means that the letter has already been printed and that the process may not be canceled.
            if (typeof error !== 'object' || error === null || !hasOwnProperty(error, 'code') || error.code !== 2) {
                throw error
            }

            return false
        } finally {
            await this.sftpClient.disconnect()
        }

        return true
    }

    private getRemoteFilePath(fileName: string): string {
        return joinPath(
            this.options.uploadPath ?? ONLINE_BRIEF_24_API_UPLOAD_PATH,
            fileName,
        )
    }

    private createDelegatedSftpClient(): SftpClient {
        const { credentials, connection } = this.options

        return new DelegatedSftpClient(
            new Ssh2SftpClient(),
            {
                ...credentials,
                host: connection?.host ?? ONLINE_BRIEF_24_API_SERVER_HOST,
                port: connection?.port ?? ONLINE_BRIEF_24_API_SERVER_PORT,
            },
        )
    }
}
