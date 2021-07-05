import { FetchRequest } from '../request'

/**
 * @internal
 */
export interface FetchResponse {
    status: number
    data: unknown
    request: FetchRequest<unknown>
}

export type RawBody = string | NodeJS.ReadableStream
export interface RawHeaders {
    [key: string]: any
}

export interface RawResponse {
    status: number
    body: RawBody
    headers: RawHeaders
}
