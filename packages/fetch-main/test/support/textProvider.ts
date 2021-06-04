import { FetchAdapter } from '../../lib/fetchAdapter'

export const textImpl: FetchAdapter<'text', string> = {
    name: 'text',
    encode: (value) => value,
    decode: (value) => value,
}

export const jsonImpl: FetchAdapter<'json', object> = {
    name: 'json',
    headers: { 'Content-Type': 'application/json' },
    encode: (value) => JSON.stringify(value),
    decode: (value) => JSON.parse(value),
}
