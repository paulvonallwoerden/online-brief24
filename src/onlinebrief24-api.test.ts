import { OnlineBrief24Api } from './onlinebrief24-api'
import {
    PrintLetterOptions,
    PrintLetterOptionsEnvelope,
    PrintLetterOptionsMode,
    PrintLetterOptionsPrint,
} from './print-letter-options'
import { SftpClient } from './sftp/sftp-client'

const TEST_PDF_DATA = Buffer.from('test-pdf-data')

const TEST_PRINT_OPTIONS: PrintLetterOptions = {
    name: 'test-invoice',
    pdfData: TEST_PDF_DATA,
    envelope: PrintLetterOptionsEnvelope.C4,
    mode: PrintLetterOptionsMode.SINGLE_SIDE,
    print: PrintLetterOptionsPrint.BLACK_AND_WHITE,
}

describe('OnlineBrief24Api', () => {
    let api: OnlineBrief24Api
    let sftpClient: SftpClient

    beforeEach(() => {
        sftpClient = {
            connect: jest.fn(),
            disconnect: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
        }

        api = new OnlineBrief24Api({
            sftpClient,
            uploadPath: '/test/upload-directory',
        })
    })

    describe('printSingleLetter', () => {
        it('should upload the pdf data to the correct location', async () => {
            expect.assertions(3)

            await api.printSingleLetter(TEST_PRINT_OPTIONS)
            expect(sftpClient.connect).toHaveBeenCalled()
            expect(sftpClient.put).toHaveBeenCalledWith(
                TEST_PDF_DATA,
                '/test/upload-directory/0010000000000-test-invoice.pdf',
            )
            expect(sftpClient.disconnect).toHaveBeenCalled()
        })

        it('should throw if the sftp client throws an error', async () => {
            expect.assertions(1)

            jest.spyOn(sftpClient, 'put').mockRejectedValueOnce(new Error('This operation failed'))
            await expect(api.printSingleLetter(TEST_PRINT_OPTIONS)).rejects.toThrowError('This operation failed')
        })
    })

    describe('printMultipleLetters', () => {
        it('should upload the archive to the correct location', async () => {
            expect.assertions(3)

            await api.printSingleLetter(TEST_PRINT_OPTIONS)
            expect(sftpClient.connect).toHaveBeenCalled()
            expect(sftpClient.put).toHaveBeenCalledWith(
                TEST_PDF_DATA,
                '/test/upload-directory/0010000000000-test-invoice.pdf',
            )
            expect(sftpClient.disconnect).toHaveBeenCalled()
        })

        it('should pack the pdfs into a archive', async () => {
            await api.printMultipleLetters([
                {
                    ...TEST_PRINT_OPTIONS,
                    pdfData: Buffer.from('pdf-data-1'),
                },
                {
                    ...TEST_PRINT_OPTIONS,
                    pdfData: Buffer.from('pdf-data-2'),
                },
            ])
        })
    })

    describe('printMultipleLetters', () => {
        it('should return true if the print is canceled', async () => {
            expect.assertions(1)

            expect(await api.cancelLetterPrint('123')).toStrictEqual(true)
        })

        it('should return false if the print isn\'t canceled', async () => {
            expect.assertions(1)

            jest.spyOn(sftpClient, 'delete').mockRejectedValue({ code: 2 })

            expect(await api.cancelLetterPrint('abc')).toStrictEqual(false)
        })

        it('should throw if the sftp throws an unknown error', async () => {
            expect.assertions(1)

            jest.spyOn(sftpClient, 'delete').mockRejectedValue(new Error('Unknown error!'))

            await expect(api.cancelLetterPrint('abc')).rejects.toThrowError('Unknown error!')
        })
    })
})
