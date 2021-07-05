import { Fetchable } from '../fetchable'
import { FetchRequest } from '../request'
import { CreateRequestAttrs } from '../request/requestAttrs'
import { FetchResponse } from '../response'

export type FetchCallback<T, TRet = unknown> = (
    response: FetchResponse<T>
) => Promise<TRet> | TRet

export type FetchUrlInit = string
export type FetchObjectInit<T = unknown> = Pick<CreateRequestAttrs<T>, 'url'> &
    Partial<CreateRequestAttrs<T>>
export type FetchInit<T> = FetchUrlInit | FetchObjectInit<T>

export type FetchArg2<T> = FetchInit<T>
export type FetchArg3<T, TRet = unknown> = FetchCallback<T, TRet>

export interface FetchFn {
    /**
     * Fetch data at url as JSON
     *
     * @param type - Data type
     * @param url - Request uRL
     * @example
     * ```typescript
     * const response = fetch(Json, 'https://example.com/posts/1')
     * response.status
     * // => 200
     * ```
     */
    <T, TRet>(type: Fetchable<T>, url: string): Promise<TRet>
    /**
     * Fetch data at url using request as object properties
     *
     * @param type - Data type
     * @param init - Request object
     * @example
     * ```typescript
     * const response = fetch(Json, {
     *      method: 'get'
     *      url: 'https://example.com/posts/1',
     * })
     * response.status
     * // => 200
     * ```
     */
    <T, TRet>(type: Fetchable<T>, init: FetchObjectInit<T>): Promise<TRet>
    /**
     * Fetch data at url as JSON and parse response in callback
     *
     * @param type - Data type
     * @param init - A URL string or request object
     * @example
     * ```typescript
     * const response = fetch(
     *      Json,
     *      'https://example.com/posts/1',
     *      response => ({
     *          title: response.data['title'].toString(),
     *          content: response.data['content'].toString(),
     *          postedAt: response.data['date'].toDate()
     *      })
     * )
     * response.title
     * // => 'my post'
     * ```
     */
    <T, TRet>(
        type: Fetchable<T>,
        init: FetchInit<T>,
        callback: FetchCallback<T, TRet>
    ): Promise<TRet>
    /**
     * @internal
     */
    <T, TRet>(
        type: Fetchable<T>,
        init: FetchInit<T>,
        callback?: FetchCallback<T, TRet>
    ): Promise<TRet>
}

export interface AwaitableFetchRequest<T, TRet = unknown>
    extends FetchRequest<T> {
    then(
        onFulfilled?: ((value: T) => any | PromiseLike<TRet>) | undefined | null
    ): Promise<TRet | never>
}
