export interface PrintLetterOptions {
    name: string
    pdfData: Buffer
    costCentre?: string
    mode: PrintLetterOptionsMode
    print: PrintLetterOptionsPrint
    envelope: PrintLetterOptionsEnvelope
    postalZone?: PrintLetterOptionsPostalZone
    paymentSlip?: PrintLetterOptionsPaymentSlip
    registeredMail?: PrintLetterOptionsRegisteredMail
}

export enum PrintLetterOptionsPrint {
    BLACK_AND_WHITE = 0,
    COLOR = 1,
}

export enum PrintLetterOptionsMode {
    SINGLE_SIDE = 0,
    TWO_SIDE = 1,
}

export enum PrintLetterOptionsEnvelope {
    DIN_LONG = 0,
    C4 = 1,
}

export enum PrintLetterOptionsPostalZone {
    AUTOMATIC = 0,
    GERMANY = 1,
    INTERNATIONAL = 3,
}

export enum PrintLetterOptionsRegisteredMail {
    NONE = 0,
    THROW_IN = 1,
    STANDARD = 2,
    BY_HAND = 3,
}

export enum PrintLetterOptionsPaymentSlip {
    NONE = 0,
    SEPA = 3,
}
