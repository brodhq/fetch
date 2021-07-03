import { RawBody } from './responseTypes'

export async function rawToString(raw: RawBody): Promise<string> {
    if (typeof raw === 'string') {
        return raw
    }
    return getStream(raw)
}

function getStream(stream: NodeJS.ReadableStream): Promise<string> {
    return new Promise((resolve) => {
        const chunks: any[] = []
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
        stream.on('end', () => resolve(Buffer.concat(chunks).toString()))
    })
}
