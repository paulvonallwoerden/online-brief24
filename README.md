# OnlineBriefe24 Api

Nodejs api for [onlinebrief24.de](https://www.onlinebrief24.de/).

## Usage

```ts
import { 
    OnlineBrief24Api,
    PrintLetterOptionsMode,
    PrintLetterOptionsPrint,
    PrintLetterOptionsEnvelope,
} from 'onlinebrief24'

const onlineBrief24Api = new OnlineBrief24Api({
    credentials: {
        username: '',
        password: '',
    },
})

const pdfData = fs.readfile('./invoice-letter-data.pdf')

const handler = await onlineBrief24Api.printSingleLetter({
    name: 'invoice-42',
    pdfData: pdfData,
    mode: PrintLetterOptionsMode.SINGLE_SIDE,
    print: PrintLetterOptionsPrint.BLACK_AND_WHITE,
    envelope: PrintLetterOptionsEnvelope.C4,
})

// Some time later...

const cancellationSuccess = await onlineBrief24Api.cancelLetterPrint(handler)

console.log(`Cancelling printing ${cancellationSuccess ? 'succeeded' : 'failed'}`)
```
