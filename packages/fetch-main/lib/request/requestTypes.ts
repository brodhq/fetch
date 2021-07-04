import type { RequestInit } from 'node-fetch'

/**
 * @internal
 */
export interface FetchRequest<T = unknown>
    extends Pick<RequestInit, 'headers' | 'method'> {
    url: string
    body?: T
}
