/**
 * @internal
 */
export interface Fetchable<TVal = any> {
    headers?: object
    encode: (value: TVal) => string
    decode: (raw: string) => TVal
}
