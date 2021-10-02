import {
    PrintLetterOptions,
    PrintLetterOptionsPostalZone,
    PrintLetterOptionsPaymentSlip,
    PrintLetterOptionsRegisteredMail,
} from "./print-letter-options"

export function generateFileName(options: Omit<PrintLetterOptions, 'pdfData'>): string {
    const {
        name,
        mode,
        print,
        envelope,
        costCentre,
        postalZone,
        paymentSlip,
        registeredMail,
    } = options
    let parameters = ''
    parameters += print
    parameters += mode
    parameters += envelope
    parameters += postalZone ?? PrintLetterOptionsPostalZone.AUTOMATIC
    parameters += registeredMail ?? PrintLetterOptionsRegisteredMail.NONE
    parameters += paymentSlip ?? PrintLetterOptionsPaymentSlip.NONE
    const costCentreParameter = costCentre ? `#${costCentre}#` : ''

    return `${parameters}0000000-${name}${costCentreParameter}.pdf`
}
