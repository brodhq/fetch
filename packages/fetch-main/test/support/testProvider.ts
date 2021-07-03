import { Fetchable } from '../../lib'

export const Text: Fetchable<string> = {
    encode: (value) => value,
    decode: (value) => value,
}

export const Json: Fetchable<object> = {
    headers: { 'Content-Type': 'application/json' },
    encode: (value) => JSON.stringify(value),
    decode: (value) => JSON.parse(value),
}
