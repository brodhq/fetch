import { Fetchable, Symbol } from '../../lib'

export const Text: Fetchable<string> = {
    [Symbol.impl]: {
        encode: (value) => value,
        decode: (value) => value,
    },
}

export const Json: Fetchable<object> = {
    [Symbol.impl]: {
        headers: { 'Content-Type': 'application/json' },
        encode: (value) => JSON.stringify(value),
        decode: (value) => JSON.parse(value),
    },
}
