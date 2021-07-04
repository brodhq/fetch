import { FetchRequest } from '../request'

/**
 * @internal
 */
export interface FetchResponse<T = unknown> {
    status: number
    data: T
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
