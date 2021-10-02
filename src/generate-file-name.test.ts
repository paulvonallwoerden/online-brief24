import { generateFileName } from './generate-file-name'
import { PrintLetterOptionsEnvelope, PrintLetterOptionsMode, PrintLetterOptionsPaymentSlip, PrintLetterOptionsPostalZone, PrintLetterOptionsPrint, PrintLetterOptionsRegisteredMail } from './print-letter-options'

describe('generateFileName', () => {
    it('should generate the correct filename', () => {
        expect.assertions(1)

        expect(generateFileName({
            envelope: PrintLetterOptionsEnvelope.DIN_LONG,
            mode: PrintLetterOptionsMode.SINGLE_SIDE,
            name: 'order-invoice',
            print: PrintLetterOptionsPrint.BLACK_AND_WHITE,
        })).toStrictEqual('0000000000000-order-invoice.pdf')
    })

    it('should set the correct parameters', () => {
        expect.assertions(10)

        expect(generateFileName({
            name: 'order-invoice',
            print: PrintLetterOptionsPrint.COLOR,
            mode: PrintLetterOptionsMode.SINGLE_SIDE,
            envelope: PrintLetterOptionsEnvelope.DIN_LONG,
            postalZone: PrintLetterOptionsPostalZone.AUTOMATIC,
            registeredMail: PrintLetterOptionsRegisteredMail.NONE,
            paymentSlip: PrintLetterOptionsPaymentSlip.NONE,
        })).toStrictEqual('1000000000000-order-invoice.pdf')

        expect(generateFileName({
            name: 'order-invoice',
            print: PrintLetterOptionsPrint.BLACK_AND_WHITE,
            mode: PrintLetterOptionsMode.TWO_SIDE,
            envelope: PrintLetterOptionsEnvelope.DIN_LONG,
            postalZone: PrintLetterOptionsPostalZone.AUTOMATIC,
            registeredMail: PrintLetterOptionsRegisteredMail.NONE,
            paymentSlip: PrintLetterOptionsPaymentSlip.NONE,
        })).toStrictEqual('0100000000000-order-invoice.pdf')

        expect(generateFileName({
            name: 'order-invoice',
            print: PrintLetterOptionsPrint.BLACK_AND_WHITE,
            mode: PrintLetterOptionsMode.SINGLE_SIDE,
            envelope: PrintLetterOptionsEnvelope.C4,
            postalZone: PrintLetterOptionsPostalZone.AUTOMATIC,
            registeredMail: PrintLetterOptionsRegisteredMail.NONE,
            paymentSlip: PrintLetterOptionsPaymentSlip.NONE,
        })).toStrictEqual('0010000000000-order-invoice.pdf')

        expect(generateFileName({
            name: 'order-invoice',
            print: PrintLetterOptionsPrint.BLACK_AND_WHITE,
            mode: PrintLetterOptionsMode.SINGLE_SIDE,
            envelope: PrintLetterOptionsEnvelope.DIN_LONG,
            postalZone: PrintLetterOptionsPostalZone.GERMANY,
            registeredMail: PrintLetterOptionsRegisteredMail.NONE,
            paymentSlip: PrintLetterOptionsPaymentSlip.NONE,
        })).toStrictEqual('0001000000000-order-invoice.pdf')

        expect(generateFileName({
            name: 'order-invoice',
            print: PrintLetterOptionsPrint.BLACK_AND_WHITE,
            mode: PrintLetterOptionsMode.SINGLE_SIDE,
            envelope: PrintLetterOptionsEnvelope.DIN_LONG,
            postalZone: PrintLetterOptionsPostalZone.INTERNATIONAL,
            registeredMail: PrintLetterOptionsRegisteredMail.NONE,
            paymentSlip: PrintLetterOptionsPaymentSlip.NONE,
        })).toStrictEqual('0003000000000-order-invoice.pdf')

        expect(generateFileName({
            name: 'order-invoice',
            print: PrintLetterOptionsPrint.BLACK_AND_WHITE,
            mode: PrintLetterOptionsMode.SINGLE_SIDE,
            envelope: PrintLetterOptionsEnvelope.DIN_LONG,
            postalZone: PrintLetterOptionsPostalZone.AUTOMATIC,
            registeredMail: PrintLetterOptionsRegisteredMail.THROW_IN,
            paymentSlip: PrintLetterOptionsPaymentSlip.NONE,
        })).toStrictEqual('0000100000000-order-invoice.pdf')

        expect(generateFileName({
            name: 'order-invoice',
            print: PrintLetterOptionsPrint.BLACK_AND_WHITE,
            mode: PrintLetterOptionsMode.SINGLE_SIDE,
            envelope: PrintLetterOptionsEnvelope.DIN_LONG,
            postalZone: PrintLetterOptionsPostalZone.AUTOMATIC,
            registeredMail: PrintLetterOptionsRegisteredMail.STANDARD,
            paymentSlip: PrintLetterOptionsPaymentSlip.NONE,
        })).toStrictEqual('0000200000000-order-invoice.pdf')

        expect(generateFileName({
            name: 'order-invoice',
            print: PrintLetterOptionsPrint.BLACK_AND_WHITE,
            mode: PrintLetterOptionsMode.SINGLE_SIDE,
            envelope: PrintLetterOptionsEnvelope.DIN_LONG,
            postalZone: PrintLetterOptionsPostalZone.AUTOMATIC,
            registeredMail: PrintLetterOptionsRegisteredMail.BY_HAND,
            paymentSlip: PrintLetterOptionsPaymentSlip.NONE,
        })).toStrictEqual('0000300000000-order-invoice.pdf')

        expect(generateFileName({
            name: 'order-invoice',
            print: PrintLetterOptionsPrint.BLACK_AND_WHITE,
            mode: PrintLetterOptionsMode.SINGLE_SIDE,
            envelope: PrintLetterOptionsEnvelope.DIN_LONG,
            postalZone: PrintLetterOptionsPostalZone.AUTOMATIC,
            registeredMail: PrintLetterOptionsRegisteredMail.NONE,
            paymentSlip: PrintLetterOptionsPaymentSlip.SEPA,
        })).toStrictEqual('0000030000000-order-invoice.pdf')

        expect(generateFileName({
            name: 'order-invoice',
            print: PrintLetterOptionsPrint.COLOR,
            mode: PrintLetterOptionsMode.TWO_SIDE,
            envelope: PrintLetterOptionsEnvelope.C4,
            postalZone: PrintLetterOptionsPostalZone.INTERNATIONAL,
            registeredMail: PrintLetterOptionsRegisteredMail.BY_HAND,
            paymentSlip: PrintLetterOptionsPaymentSlip.SEPA,
        })).toStrictEqual('1113330000000-order-invoice.pdf')
    })

    it('should add a cost centre correctly', () => {
        expect.assertions(1)

        expect(generateFileName({
            envelope: PrintLetterOptionsEnvelope.DIN_LONG,
            mode: PrintLetterOptionsMode.SINGLE_SIDE,
            name: 'order-invoice',
            print: PrintLetterOptionsPrint.BLACK_AND_WHITE,
            costCentre: 'accounting',
        })).toStrictEqual('0000000000000-order-invoice#accounting#.pdf')
    })
})
