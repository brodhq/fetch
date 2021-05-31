export interface FetchAdapter<TName extends string = string, TVal = any> {
    name: TName
    headers?: object
    encode: (value: TVal) => string
    decode: (raw: string) => TVal
}
