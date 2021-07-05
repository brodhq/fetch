export const impl: unique symbol = Symbol()
/**
 * @internal
 */
export interface Fetchable<TVal = any> {
    [impl]: {
        headers?: object
        encode: (value: TVal) => string
        decode: (raw: string) => TVal
    }
}
